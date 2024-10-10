def on_received_number(receivedNumber):
    global score
    if button_pressed == "b":
        score += 1
    if button_pressed == "a":
        score += -1
radio.on_received_number(on_received_number)

def on_received_string(receivedString):
    global button_pressed
    button_pressed = button_pressed
radio.on_received_string(on_received_string)

button_pressed = ""
radio.set_group(1)
score = 0
radio.set_frequency_band(0)