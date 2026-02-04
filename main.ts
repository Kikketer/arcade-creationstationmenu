controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    moveSelection("up")
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentScene == "menu") {
        launchGame()
    } else if (currentScene == "title") {
        currentScene = "menu"
        loadScene()
    }
})
function loadScene () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    lastButtonPress = game.runtime()
    for (let tSprite of textSprites) {
        sprites.destroy(tSprite)
    }
    if (currentScene == "menu") {
        logoSprite = sprites.create(img`
            . 
            `, SpriteKind.Food)
        logoSprite.x = 16
        logoSprite.y = 5
        animation.runImageAnimation(
        logoSprite,
        assets.animation`MadeLogoAnim`,
        500,
        true
        )
        selection = sprites.create(assets.image`selector`, SpriteKind.Food)
        selection.z = 10
        selection.setPosition(leftColumnLeft + gameWidth / 2, rowHeight * 0 + gameOffsetTop + 17)
        animation.runImageAnimation(
        selection,
        assets.animation`selectionAnim`,
        200,
        true
        )
    } else if (currentScene == "title") {
        sceneStartTime = game.runtime()
        sceneChangeTime = 60000
        logoSprite = sprites.create(img`
            . 
            `, SpriteKind.Food)
        logoSprite.x = 16
        logoSprite.y = 10
        animation.runImageAnimation(
        logoSprite,
        assets.animation`MadeLogoAnim`,
        200,
        true
        )
        for (let i = 0; i <= blurbOne.length - 1; i++) {
            tempTextSprite = textsprite.create(blurbOne[i])
            tempTextSprite.x = 80
            tempTextSprite.y = 60 + (tempTextSprite.height + 2) * i
            textSprites.push(tempTextSprite)
        }
        tempTextSprite = textsprite.create(blurbTwo[0])
        tempTextSprite.x = 80
        tempTextSprite.y = 60 + blurbOne.length * (tempTextSprite.height + 2) + 10
        textSprites.push(tempTextSprite)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveSelection("left")
})
spriteutils.createRenderable(3, function (screen2) {
    if (currentScene == "menu") {
        for (let index = 0; index <= gameImages.length - 1; index++) {
            if (index % 2 == 0) {
                screen2.drawTransparentImage(gameImages[index], leftColumnLeft, gameOffsetTop + Math.floor(index / 2) * rowHeight)
                screen2.drawTransparentImage(gamePlayerImages[gamePlayers[index] - 1], leftColumnLeft + 48, gameOffsetTop + 19 + Math.floor(index / 2) * rowHeight)
            } else {
                screen2.drawTransparentImage(gameImages[index], rightColumnLeft, gameOffsetTop + Math.floor(index / 2) * rowHeight)
                screen2.drawTransparentImage(gamePlayerImages[gamePlayers[index] - 1], rightColumnLeft + 48, gameOffsetTop + 19 + Math.floor(index / 2) * rowHeight)
            }
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveSelection("right")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveSelection("down")
})
function launchGame () {
    if (selection.x - selection.width / 2 == leftColumnLeft && gameNames[currentRow * 2] != undefined) {
        music.play(music.stringPlayable("C E - - - - - - ", 500), music.PlaybackMode.InBackground)
        console.logValue("Launching game!!", gameNames[currentRow * 2])
        control.runProgram(gameNames[currentRow * 2])
    } else if (gameNames[currentRow * 2 + 1] != undefined) {
        music.play(music.stringPlayable("C E - - - - - - ", 500), music.PlaybackMode.InBackground)
        console.logValue("Launching game!", gameNames[currentRow * 2 + 1])
        control.runProgram(gameNames[currentRow * 2 + 1])
    } else {
        music.play(music.stringPlayable("E C - - - - - - ", 500), music.PlaybackMode.InBackground)
    }
}
function validateGames () {
    actualGameList = control.programList()
for (let gli = 0; gli <= gameNames.length - 1; gli++) {
        tempFoundGame = actualGameList.indexOf(gameNames[gli])
        if (tempFoundGame < 0) {
            gameNames[gli] = undefined
        }
    }
}
function moveSelection (direction: string) {
    if (currentScene != "menu") {
        return
    }
    lastButtonPress = game.runtime()
    currentRow = (selection.y - selection.height / 2 - gameOffsetTop) / rowHeight
    sprites.destroy(gameAnimationSprite)
    sprites.destroy(playersSprite)
    if (direction == "up" && currentRow > 0) {
        selection.y = selection.y - rowHeight
        currentRow = (selection.y - selection.height / 2 - gameOffsetTop) / rowHeight
    } else if (direction == "down" && currentRow < numberOfRows - 1) {
        if (numberOfRows - (currentRow + 1) == 1 && gameImages.length % 2 == 1 && selection.x - selection.width / 2 == rightColumnLeft) {
            return
        }
        selection.y = selection.y + rowHeight
        currentRow = (selection.y - selection.height / 2 - gameOffsetTop) / rowHeight
    } else if (direction == "right" && selection.x - selection.width / 2 < rightColumnLeft - selection.width / 2) {
        if (numberOfRows - (currentRow + 1) == 0 && gameImages.length % 2 == 1 && selection.x - selection.width / 2 == leftColumnLeft) {
            return
        }
        selection.x = rightColumnLeft + selection.width / 2
    } else if (direction == "left" && selection.x - selection.width / 2 > leftColumnLeft - selection.width / 2) {
        selection.x = leftColumnLeft + selection.width / 2
    }
    if (selection.x - selection.width / 2 == leftColumnLeft && gameAnimations[currentRow * 2]) {
        playersSprite = sprites.create(assets.image`player4`)
        playersSprite.setPosition(selection.x + 24, selection.y + 10)
        playersSprite.z = 10
        gameAnimationSprite = sprites.create(img`
            . 
            `, SpriteKind.Food)
        gameAnimationSprite.z = 5
        gameAnimationSprite.setPosition(selection.x - 29, selection.y - 16)
        animation.runImageAnimation(
        gameAnimationSprite,
        gameAnimations[currentRow * 2],
        200,
        true
        )
    } else if (selection.x - selection.width / 2 == rightColumnLeft && gameAnimations[currentRow * 2 + 1]) {
        playersSprite = sprites.create(assets.image`player4`)
        playersSprite.setPosition(selection.x + 24, selection.y + 10)
        playersSprite.z = 10
        gameAnimationSprite = sprites.create(img`
            . 
            `, SpriteKind.Food)
        gameAnimationSprite.z = 5
        gameAnimationSprite.setPosition(selection.x - 29, selection.y - 16)
        animation.runImageAnimation(
        gameAnimationSprite,
        gameAnimations[currentRow * 2 + 1],
        200,
        true
        )
    }
}
let gameAnimationSprite: Sprite = null
let tempFoundGame = 0
let tempTextSprite: TextSprite = null
let sceneChangeTime = 0
let sceneStartTime = 0
let selection: Sprite = null
let logoSprite: Sprite = null
let playersSprite: Sprite = null
let lastButtonPress = 0
let gameWidth = 0
let numberOfRows = 0
let rightColumnLeft = 0
let leftColumnLeft = 0
let gameOffsetTop = 0
let gameAnimations: Image[][] = []
let gameImages: Image[] = []
let rowHeight = 0
let currentScene = ""
let blurbTwo: string[] = []
let blurbOne: string[] = []
let textSprites: Sprite[] = []
let tempXpos = 0
let actualGameList: string[] = []
let gameNames: string[] = []
let currentRow = 0
actualGameList = [""]
let tempSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
textSprites = [tempSprite]
blurbOne = ["These games were created", "by students of the", "\"Make Video Games\" class."]
blurbTwo = ["Sign up today!"]
currentScene = "title"
rowHeight = 38
gameImages = [
assets.image`PaddleIcon`,
assets.image`StarIcon`,
assets.image`SyncTheBoat`,
assets.image`SpoopIcon`
]
gameAnimations = [
[assets.image`PaddleIcon`],
assets.animation`Super Star Story`,
[assets.image`SyncTheBoat`],
[assets.image`SpoopIcon`]
]
let gamePlayerImages = [
assets.image`player4`,
assets.image`player4`,
assets.image`player4`,
assets.image`player4`
]
let gamePlayers = [
1,
4,
4,
4
]
gameNames = [
"Paddle-the-River",
"Super-Star-Story",
"SyncTheBoat",
"Spoop"
]
gameOffsetTop = 40
leftColumnLeft = 15
rightColumnLeft = 85
numberOfRows = Math.ceil(gameImages.length / 2)
let gameHeight = 34
gameWidth = 60
validateGames()
loadScene()
game.onUpdateInterval(1000, function () {
    if (currentScene == "title" && game.runtime() - sceneStartTime > sceneChangeTime) {
        currentScene = "menu"
        loadScene()
    } else if (currentScene == "menu" && game.runtime() - lastButtonPress > 30000) {
        currentScene = "title"
        loadScene()
    }
})
