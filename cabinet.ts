// Cabinet runtime hooks. Declared here so the stock MakeCode Arcade
// editor doesn't flag them as errors; the real implementations live in
// the native runtime (libpxt.so, hw---vm gamesel.cpp) on the cabinet.
// These do NOT exist in the simulator — keep cabinet.debugMode = true
// while editing, or guard calls behind it.
declare namespace control {
    /**
     * Lists installed games (directory names under the games dir).
     */
    function programList(): string[]

    /**
     * Cover art for a program (cover.png / cover.img next to its Game),
     * as a Buffer ready for image.ofBuffer(). Null when it has none.
     */
    function programImage(prog: string): Buffer

    /**
     * Metadata for a program (info.json next to its Game), or null.
     * Shape is up to the menu; e.g. {"name": "Cool Game", "players": 2}
     */
    function programInfo(prog: string): string

    /**
     * Asks the launcher to run the named program, then exits this game.
     */
    function runProgram(prog: string): void

    /**
     * Deletes an installed program.
     */
    function deleteProgram(prog: string): void
}

namespace cabinet {
    export interface GameInfo {
        /** directory name — what control.runProgram() takes */
        name: string
        /** pretty name from info.json, falls back to name */
        displayName: string
        /** player count from info.json, 0 when unknown */
        players: number
        /** cover.png / cover.img, null when the game has none */
        image: Image
    }

    // Set true while editing in the simulator: control.programList()
    // and friends don't exist there, so the menu can't call them.
    export let debugMode = false

    /**
     * Installed game names: control.programList() minus dotdirs and the
     * menu itself, sorted so the grid order is stable.
     */
    export function gameList(): string[] {
        const names = control.programList()
        const kept = names.filter((s) => s && s[0] != '.' && s != 'Menu')
        kept.sort()
        return kept
    }

    /**
     * Cover art + info.json metadata for one installed game.
     */
    export function gameInfo(name: string): GameInfo {
        let cover: Image = null
        const art = control.programImage(name)
        if (art) cover = imageOfBuffer(art)

        let displayName = name
        let players = 0
        const raw = control.programInfo(name)
        if (raw && raw[0] == '{') {
            const info = JSON.parse(raw)
            if (info['name']) displayName = info['name']
            if (info['players']) players = info['players'] | 0
        }

        return { name, displayName, players, image: cover }
    }

    // image.ofBuffer with a null check — programImage can hand back null.
    function imageOfBuffer(buf: Buffer): Image {
        const img = image.ofBuffer(buf)
        return img && img.width > 0 ? img : null
    }
}
