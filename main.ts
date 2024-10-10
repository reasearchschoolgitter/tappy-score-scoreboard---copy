enum RadioMessage {
    message1 = 49434,
    otaupdate = 23912,
    ngame = 13805,
    zero = 7640,
    vol_stop = 31231,
    sync = 27907,
    scoreinbound = 61264,
    a = 18289,
    b = 9031,
    myscore = 47365,
    test = 2239
}
radio.onReceivedMessage(RadioMessage.scoreinbound, function () {
    radio.sendMessage(RadioMessage.scoreinbound)
    sendscore()
    newscore = 0
    basic.pause(10)
    syncgo = 1
    basic.pause(10000)
    stopscoresending = 1
})
radio.onReceivedMessage(RadioMessage.zero, function () {
    score = 0
})
function scoreboard () {
    while (true) {
        if (input.buttonIsPressed(Button.AB)) {
            scoreboard()
        }
    }
    while (true) {
        if (score == 100) {
            basic.showString("team b won")
            options()
        } else if (score == -100) {
            basic.showString("team a won")
            options()
        }
        while (true) {
            let button_pressed = ""
            basic.showString("" + (score))
            if (button_pressed == "b") {
                score += 1
                scoreboard()
            }
            if (button_pressed == "a") {
                score += -1
                scoreboard()
            }
        }
    }
}
radio.onReceivedMessage(RadioMessage.vol_stop, function () {
    vol = 0
})
radio.onReceivedNumber(function (receivedNumber) {
    if (syncgo == 1) {
        if (scorecoming == 1) {
            if (receivedNumber == score) {
                sendscore()
            } else if (receivedNumber > score) {
                score = receivedNumber - score
            } else {
                sendscore()
            }
        }
        newscore = receivedNumber
        score = newscore
        newscore = 0
        syncgo = 0
    }
})
function options () {
    basic.pause(1000)
    music.setVolume(vol)
    music.play(music.stringPlayable("E D C E C5 C D E ", 120), music.PlaybackMode.UntilDone)
    basic.showString("a to quit b to start new game both to reset microbit")
    if (input.buttonIsPressed(Button.AB)) {
        control.reset()
    }
    if (input.buttonIsPressed(Button.A)) {
        reset_game()
        music.setVolume(vol)
        music.play(music.stringPlayable("F E C D G E D E ", 120), music.PlaybackMode.LoopingInBackground)
        basic.showString("not counting")
    }
    if (input.buttonIsPressed(Button.B)) {
        radio.sendMessage(RadioMessage.ngame)
    }
}
radio.onReceivedString(function () {
    score += -1
    scoreboard()
})
radio.onReceivedMessage(RadioMessage.otaupdate, function () {
    music.setVolume(vol)
    music.play(music.stringPlayable("A F E F C5 F C F ", 120), music.PlaybackMode.LoopingInBackground)
    music.play(music.stringPlayable("A F E F C5 F C F ", 120), music.PlaybackMode.LoopingInBackground)
    basic.showString("your outdated, please bring your microbit back to neekan or hamza")
})
function sendscore () {
    if (stopscoresending == 0) {
        radio.sendMessage(RadioMessage.myscore)
        basic.pause(1)
        radio.sendMessage(score)
    }
}
radio.onReceivedString(function () {
    basic.showString("hello world")
})
radio.onReceivedString(function () {
    score += 1
    scoreboard()
})
radio.onReceivedMessage(RadioMessage.myscore, function () {
    scorecoming = 1
})
radio.onReceivedMessage(RadioMessage.sync, function () {
    score = 0
    radio.sendMessage(RadioMessage.sync)
})
radio.onReceivedMessage(RadioMessage.a, function () {
    score += -1
})
function reset_game () {
    control.reset()
    radio.setGroup(1)
    score = 0
    radio.setFrequencyBand(37)
}
radio.onReceivedMessage(RadioMessage.b, function () {
    score += 1
})
let scorecoming = 0
let stopscoresending = 0
let syncgo = 0
let newscore = 0
let vol = 0
let score = 0
radio.setGroup(91)
score = 0
vol = 127
radio.setTransmitPower(7)
scoreboard()
loops.everyInterval(100, function () {
    scoreboard()
})
