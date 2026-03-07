from datetime import datetime, timedelta
import pygame, time, colorsys, sys, random, typing

BLACK = 0
RED = 1
GREEN = 2
YELLOW = 3
BLUE = 4
MAGENTA = 5
CYAN = 6
WHITE = 7
DEFAULT_COLOR = 9

def rand_rgb() -> tuple[int, int, int]:
    return (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

def fore(string: typing.Any, color: int | list[int] | tuple[int, int, int]) -> str:
    if isinstance(color, int):
        processed = str(string)
        if (color > 7 and color != 9 and color < 60) or (color > 67): raise Exception("Unsupported default terminal color.")
        try:
            return f"\033[{(30 + color)}m{processed}\033[39m"
        except ValueError:
            raise Exception("Unsupported default terminal color.")
    else:
        processed = str(string)
        r, g, b = color
        return f"\033[38;2;{r};{g};{b}m{processed}\033[39m"

def back(string: typing.Any, color: int | list[int] | tuple[int, int, int]) -> str:
    if isinstance(color, int):
        processed = str(string)
        if (color > 7 and color != 9 and color < 60) or (color > 67): raise Exception("Unsupported default terminal color.")
        try:
            return f"\033[{(40 + color)}m{processed}\033[39m"
        except ValueError:
            raise Exception("Unsupported default terminal color.")
    else:
        processed = str(string)
        r, g, b = color
        return f"\033[48;2;{r};{g};{b}m{processed}\033[39m"

def gradient(string: str, start_rgb: list[int] | tuple[int, int, int], end_rgb: list[int] | tuple[int, int, int]):
    start_h, start_l, start_s = colorsys.rgb_to_hls(start_rgb[0] / 255, start_rgb[1] / 255, start_rgb[2] / 255)
    end_h, end_l, end_s = colorsys.rgb_to_hls(end_rgb[0] / 255, end_rgb[1] / 255, end_rgb[2] / 255)
    processed = [char for char in string if char != " "]
    length = len(processed)
    res = list(string)
    processed_index = 0
    for index, char in enumerate(res):
        if char == " ":
            continue
        interpolated_h = start_h + (end_h - start_h) * (processed_index / length)
        interpolated_l = start_l + (end_l - start_l) * (processed_index / length)
        interpolated_s = start_s + (end_s - start_s) * (processed_index / length)
        new_r, new_g, new_b = [int(element * 255) for element in colorsys.hls_to_rgb(interpolated_h, interpolated_l, interpolated_s)]
        res[index] = fore(char, (new_r, new_g, new_b))
        processed_index += 1
    return "".join(res)

def italic(string: str) -> str:
    return f"\033[3m{string}\033[23m"

def bold(string: str) -> str:
    return f"\033[1m{string}\033[22m"

def clear_screen():
    sys.stdout.write("\r\033[2J\033[H")
    sys.stdout.flush()

pygame.mixer.init()

# !!! ADJUST THESE TO THE DESIRED TIMING !!!
START_HOUR = 23
START_MINUTE = 58
START_SECOND = 00
START_MILLISECOND = 250

END_HOUR = 0
END_MINUTE = 0
END_SECOND = 0
END_MILLISECOND = 0

clear_screen()

print(f"Playing music.mp3 at {bold(f"{START_HOUR}:{START_MINUTE}:{START_SECOND}.{START_MILLISECOND}")}\nDrop at {bold(f"{END_HOUR}:{END_MINUTE}:{END_SECOND}.{END_MILLISECOND}")}")

now = datetime.now()
target = now.replace(hour=START_HOUR, minute=START_MINUTE, second=START_SECOND, microsecond=START_MILLISECOND)
if target <= now:
    target += timedelta(days=1)

time.sleep((target - now).total_seconds())

# Make sure to replace music.mp3 with the desired music
print(fore("Playing music.mp3...", BLUE))
pygame.mixer.music.load("./music.mp3")
pygame.mixer.music.play()

end_target = target.replace(
    hour=END_HOUR,
    minute=END_MINUTE,
    second=END_SECOND,
    microsecond=END_MILLISECOND
)

if end_target <= target:
    end_target += timedelta(days=1)

while datetime.now() < end_target:
    time.sleep(0.1)

clear_screen()

try:
    while True:
        print(
            gradient(
                "🎉 HAPPY NEW YEAR!!! 🎉",
                rand_rgb(),
                rand_rgb()
            )
        )
        time.sleep(0.05)
except KeyboardInterrupt:
    clear_screen()
    print(italic("Goodbye 👋"))
