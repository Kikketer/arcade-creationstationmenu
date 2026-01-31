controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    moveSelection("up")
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    launchGame()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveSelection("left")
})
spriteutils.createRenderable(3, function (screen2) {
    for (let index = 0; index <= gameImages.length - 1; index++) {
        if (index % 2 == 0) {
            screen2.drawTransparentImage(gameImages[index], leftColumnLeft, gameOffsetTop + Math.floor(index / 2) * rowHeight)
        } else {
            screen2.drawTransparentImage(gameImages[index], rightColumnLeft, gameOffsetTop + Math.floor(index / 2) * rowHeight)
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
    console.log("Launching game!")
    if (selection.x - selection.width / 2 == leftColumnLeft) {
        control.runProgram(gameNames[currentRow * 2])
    } else {
        control.runProgram(gameNames[currentRow * 2 + 1])
    }
}
function moveSelection (direction: string) {
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
let selection: Sprite = null
let numberOfRows = 0
let rightColumnLeft = 0
let leftColumnLeft = 0
let gameOffsetTop = 0
let gameImages: Image[] = []
let rowHeight = 0
let currentRow = 0
rowHeight = 40
gameImages = [assets.image`PaddleIcon`, assets.image`PaddleIcon`, assets.image`PaddleIcon`]
let gameAnimations = [0, 1]
let gameNames = ["Paddle", "SyncTheBoat", "Star"]
gameOffsetTop = 10
leftColumnLeft = 15
rightColumnLeft = 85
numberOfRows = Math.ceil(gameImages.length / 2)
let gameHeight = 34
let gameWidth = 60
selection = sprites.create(assets.image`selector`, SpriteKind.Player)
selection.z = 10
selection.setPosition(leftColumnLeft + gameWidth / 2, rowHeight * 0 + gameOffsetTop + 17)
