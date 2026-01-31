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
    for (let tSprite of textSprites) {
        sprites.destroy(tSprite)
    }
    if (currentScene == "menu") {
        tempSprite = sprites.create(img`
            . 
            `, SpriteKind.Food)
        tempSprite.x = 16
        tempSprite.y = 5
        animation.runImageAnimation(
        tempSprite,
        assets.animation`MadeLogoAnim`,
        500,
        true
        )
        selection = sprites.create(assets.image`selector`, SpriteKind.Player)
        selection.z = 10
        selection.setPosition(leftColumnLeft + gameWidth / 2, rowHeight * 0 + gameOffsetTop + 17)
        animation.runImageAnimation(selection, assets.animation`selectionAnim`, 200, true)
    } else if (currentScene == "title") {
        tempSprite = sprites.create(img`
            . 
            `, SpriteKind.Food)
        tempSprite.x = 16
        tempSprite.y = 10
        animation.runImageAnimation(
        tempSprite,
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
            } else {
                screen2.drawTransparentImage(gameImages[index], rightColumnLeft, gameOffsetTop + Math.floor(index / 2) * rowHeight)
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
    if (selection.x - selection.width / 2 == leftColumnLeft) {
        console.logValue("Launching game!", gameNames[currentRow * 2])
        control.runProgram(gameNames[currentRow * 2])
    } else {
        console.logValue("Launching game!", gameNames[currentRow * 2 + 1])
        control.runProgram(gameNames[currentRow * 2 + 1])
    }
}
function moveSelection (direction: string) {
    if (currentScene != "menu") {
        return
    }
    currentRow = (selection.y - selection.height / 2 - gameOffsetTop) / rowHeight
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
}
let tempTextSprite: TextSprite = null
let selection: Sprite = null
let gameWidth = 0
let numberOfRows = 0
let rightColumnLeft = 0
let leftColumnLeft = 0
let gameOffsetTop = 0
let gameImages: Image[] = []
let rowHeight = 0
let currentScene = ""
let blurbTwo: string[] = []
let blurbOne: string[] = []
let textSprites: Sprite[] = []
let tempSprite: Sprite = null
let currentRow = 0
let gameNames: string[] = []
let tempXpos: number = 0
tempSprite = sprites.create(img`
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
gameImages = [assets.image`PaddleIcon`, assets.image`StarIcon`, assets.image`SyncTheBoat`]
let gameAnimations = [spriteutils.nullConsts(spriteutils.NullConsts.Undefined), assets.animation`Super Star Story`, spriteutils.nullConsts(spriteutils.NullConsts.Undefined)]
gameNames = ["Paddle-the-River", "Star", "SyncTheBoat"]
gameOffsetTop = 40
leftColumnLeft = 15
rightColumnLeft = 85
numberOfRows = Math.ceil(gameImages.length / 2)
let gameHeight = 34
gameWidth = 60
loadScene()
