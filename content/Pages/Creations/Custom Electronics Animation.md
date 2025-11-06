---
tags:
  - creation
  - creation/crafting
date: 2025-10-19
---
Build on work from [this git repo](https://github.com/TimHanewich/MicroPython-SSD1306).

![[DIY_Animation_Circuit.mp4]]

- Based on repo: https://github.com/TimHanewich/MicroPython-SSD1306
- Pixen for animation frame drawing & generation
- Using SSD1306 wired to the Raspberry Pico
- Thonny for running & uploading the code to the Pico

Based on repo: https://github.com/TimHanewich/MicroPython-SSD1306
- Pixen for animation frame drawing & generation

Using SSD1306 wired to the Raspberry Pico.

General steps for reproduction:

1. Draw 128x64 single-bit images in Pixen
2. Export by: Animation > Export Frame Sequence...
	1. Save as PNGs - turn OFF alpha **NO TRANSPARENCY**
3. Save pngs by themselves in a folder on computer
4. On computer, run the on-computer code below to convert PNGs into **buffers**
	1. Make sure the `original_bitmaps_dir` variable points to the folder of PNGs
5. Connect the PICO to the computer & the SSD1306 to the PICO ([[#Wiring]] below)
6. Upload the folder of buffers to the Pico
7. On pico, create `main.py` below & upload it

## Wiring

- Computer USB to PICO USB
- SSD1306 VCC to pin 36 (3V3)
- SSD1306 GND to pin 38 (GND)
- SSD1306 SCL to pin 1 (GPIO 1)
- SSD1306 SDA to pin 0 (GPIO 0)

![[animation_wiring.jpeg]]
Ignore the +/- on the breadboard bus. I wasn't paying attention to those & have my ground on the "+" bar.
## On-Computer Code
I did this in Thonny.

### convert.py

```python
import PIL.Image
import os

import PIL.ImageMode

# returns buffer (bytes), width, height
def image_to_buffer(img_path:str, threshold:float = 0.5, resize:tuple[int, int] = None) -> tuple[bytes, int, int]:
    """
    Converts a bitmap image (JPG, PNG, etc.) to a byte buffer, translating each RGB pixel into a single white/black dot that can be displayed on an OLED display.
    
    Parameters
    ----------
    img_path:str
        The path to the image file.
    threshold:float, optional
        Defines how "dark" each RGB pixel has to be for it to be considered "filled in". Higher threshold values are more discriminating.

    Returns
    -------
    tuple
        A tuple containing:
        - bytes: The image data in bytes that can be loaded into a FrameBuffer in MicroPython.
        - int: The width of the image.
        - int: The height of the image.
    """
    

    # open image
    i = PIL.Image.open(img_path).convert("RGB") # always open in RGB mode (don't handle RGBA like in PNG)

    # resize if desired
    if resize != None:
        i = i.resize(resize)

    # record size
    width, height = i.size

    # calculate the threshold. In other words, the average RGB value that the pixel has to be below (filled in with darkness) to be considered "on" and above to be considered "off"
    thresholdRGB:int = min(max(int(round(threshold * 255, 0)), 0), 255)
    
    # get a list of individual bits for each pixel (True is filled in, False is not filled in)
    bits:list[bool] = []
    for y in range(0, height):
        for x in range(0, width):
            pix:tuple[int, int, int, int] = i.getpixel((x, y)) #[R,G,B,A]
            
            # determine, is this pixel solid (filled in BLACK) or not (filled in WHITE)?
            filled:bool = False
            avg:int = int(round((pix[0] + pix[1] + pix[2]) / 3, 0))
            if avg >= thresholdRGB: # it is bright (so fill it with an on pixel)
                filled = True

            # add it to the list of bits
            bits.append(filled)

    # now that we have all the bits, chunk them by 8 and convert
    BytesToReturn:bytearray = bytearray()
    bit_collection_buffer:list[bool] = []
    for bit in bits:

        # add it
        bit_collection_buffer.append(bit)

        # if we are now at 8, convert and append
        if len(bit_collection_buffer) == 8:

            # convert to 1's and 0's
            AsStr:str = ""
            for bit in bit_collection_buffer:
                if bit:
                    AsStr = AsStr + "1"
                else:
                    AsStr = AsStr + "0"
            
            # convert to byte
            b = int(AsStr, 2)

            # Add it
            BytesToReturn.append(b)

            # clear out bit collection buffer
            bit_collection_buffer.clear()

    # return!
    return (bytes(BytesToReturn), width, height)

def images_to_buffers(original_bitmaps_dir:str, output_dir:str, threshold:float = 0.5, resize:tuple[int, int] = None) -> None:
    """Converts all bitmap images in a folder to a buffer in another file. Great for converting a group of bitmap images to various sizes, ready for display on SSD-1306."""

    for filename in os.listdir(original_bitmaps_dir):
        if not (filename.lower().endswith('.png') or filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg')):
            continue  # skip non-image files
        fullpath = os.path.join(original_bitmaps_dir, filename)
        converted = image_to_buffer(fullpath, resize=resize, threshold=threshold)
        
        # trim off the ".png"
        fn_only:str = filename[0:-4]
        result_path = os.path.join(output_dir, fn_only)
        f = open(result_path, "wb")
        f.write(bytes(converted[0]))
        f.close()

        # print
        print("Finished converting '" + filename + "'!")
        
def test():
    print("remote called")


```

### Do_Convert.py

```python
import convert

convert.test() # prints something to show the import worked

convert.images_to_buffers(
    original_bitmaps_dir=r"/Users/aaron/Developer/Raspbery Pi Stuff/Ninja_Animation",
    output_dir=r"/Users/aaron/Developer/Raspbery Pi Stuff/ninja_frames",
    threshold=0.5,
    resize=(128, 64)
)
```

## On Pico

### main.py

```python
import os
import time
from machine import Pin, I2C
import ssd1306
import framebuf

# === SET THESE BASED ON YOUR OUTPUT FILES ===
IMAGE_WIDTH = 128
IMAGE_HEIGHT = 64
ANIMATION_FOLDER = "/ninja_frames"  # Folder on Pico (copy files here)
FRAME_DURATION_MS = 200             # Time per frame in milliseconds

# === SET UP I2C + OLED DISPLAY ===
i2c = I2C(0, scl=Pin(1), sda=Pin(0))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)

# === LOAD ALL BUFFERS FROM FOLDER ===
def load_framebuffers_from_folder(folder: str, width: int, height: int):
    framebuffers = []
    filenames = sorted(os.listdir(folder))  # Sort for proper order

    for filename in filenames:
        # Skip hidden files like .DS_Store or ._junk
        if filename.startswith("."):
            continue

        full_path = folder + "/" + filename

        try:
            with open(full_path, "rb") as f:
                buffer = f.read()
            fb = framebuf.FrameBuffer(bytearray(buffer), width, height, framebuf.MONO_HLSB)
            framebuffers.append(fb)
        except Exception as e:
            print("Skipping:", filename, "| Reason:", e)
            continue

    return framebuffers

# === LOAD FRAMES ===
frames = load_framebuffers_from_folder(ANIMATION_FOLDER, IMAGE_WIDTH, IMAGE_HEIGHT)
print("Loaded", len(frames), "frames.")


# === DISPLAY LOOP ===
while True:
    for i, fb in enumerate(frames):
        oled.fill(0)
        oled.blit(fb, 0, 0)
        oled.show()
        print("Displaying frame", i)
        time.sleep_ms(FRAME_DURATION_MS)


```

### ssd1306.py

This is the library I found to drive my SSD1306 display board. It needs to be on the pico.
```python
# MicroPython SSD1306 OLED driver, I2C and SPI interfaces

from micropython import const
import framebuf


# register definitions
SET_CONTRAST        = const(0x81)
SET_ENTIRE_ON       = const(0xa4)
SET_NORM_INV        = const(0xa6)
SET_DISP            = const(0xae)
SET_MEM_ADDR        = const(0x20)
SET_COL_ADDR        = const(0x21)
SET_PAGE_ADDR       = const(0x22)
SET_DISP_START_LINE = const(0x40)
SET_SEG_REMAP       = const(0xa0)
SET_MUX_RATIO       = const(0xa8)
SET_COM_OUT_DIR     = const(0xc0)
SET_DISP_OFFSET     = const(0xd3)
SET_COM_PIN_CFG     = const(0xda)
SET_DISP_CLK_DIV    = const(0xd5)
SET_PRECHARGE       = const(0xd9)
SET_VCOM_DESEL      = const(0xdb)
SET_CHARGE_PUMP     = const(0x8d)


class SSD1306:
    def __init__(self, width, height, external_vcc, color=framebuf.MONO_VLSB):
        self.width = width
        self.height = height
        self.external_vcc = external_vcc
        self.pages = self.height // 8
        self.buffer = bytearray(self.pages * self.width)
        fb = framebuf.FrameBuffer(self.buffer, self.width, self.height, color)
        self.framebuf = fb
        # Provide methods for accessing FrameBuffer graphics primitives. This is a
        # workround because inheritance from a native class is currently unsupported.
        # http://docs.micropython.org/en/latest/pyboard/library/framebuf.html
        self.fill = fb.fill
        self.pixel = fb.pixel
        self.hline = fb.hline
        self.vline = fb.vline
        self.line = fb.line
        self.rect = fb.rect
        self.fill_rect = fb.fill_rect
        self.text = fb.text
        self.scroll = fb.scroll
        self.blit = fb.blit
        self.init_display()

    def init_display(self):
        for cmd in (
            SET_DISP | 0x00, # off
            # address setting
            SET_MEM_ADDR, 0x00, # horizontal
            # resolution and layout
            SET_DISP_START_LINE | 0x00,
            SET_SEG_REMAP | 0x01, # column addr 127 mapped to SEG0
            SET_MUX_RATIO, self.height - 1,
            SET_COM_OUT_DIR | 0x08, # scan from COM[N] to COM0
            SET_DISP_OFFSET, 0x00,
            SET_COM_PIN_CFG, 0x02 if self.height == 32 else 0x12,
            # timing and driving scheme
            SET_DISP_CLK_DIV, 0x80,
            SET_PRECHARGE, 0x22 if self.external_vcc else 0xf1,
            SET_VCOM_DESEL, 0x30, # 0.83*Vcc
            # display
            SET_CONTRAST, 0xff, # maximum
            SET_ENTIRE_ON, # output follows RAM contents
            SET_NORM_INV, # not inverted
            # charge pump
            SET_CHARGE_PUMP, 0x10 if self.external_vcc else 0x14,
            SET_DISP | 0x01): # on
            self.write_cmd(cmd)
        self.fill(0)
        self.show()

    def poweroff(self):
        self.write_cmd(SET_DISP | 0x00)

    def poweron(self):
        self.write_cmd(SET_DISP | 0x01)

    def contrast(self, contrast):
        self.write_cmd(SET_CONTRAST)
        self.write_cmd(contrast)

    def invert(self, invert):
        self.write_cmd(SET_NORM_INV | (invert & 1))

    def show(self):
        x0 = 0
        x1 = self.width - 1
        if self.width == 64:
            # displays with width of 64 pixels are shifted by 32
            x0 += 32
            x1 += 32
        self.write_cmd(SET_COL_ADDR)
        self.write_cmd(x0)
        self.write_cmd(x1)
        self.write_cmd(SET_PAGE_ADDR)
        self.write_cmd(0)
        self.write_cmd(self.pages - 1)
        self.write_data(self.buffer)


class SSD1306_I2C(SSD1306):
    def __init__(self, width, height, i2c, addr=0x3c, external_vcc=False, color=framebuf.MONO_VLSB):
        self.i2c = i2c
        self.addr = addr
        self.temp = bytearray(2)
        super().__init__(width, height, external_vcc, color)

    def write_cmd(self, cmd):
        self.temp[0] = 0x80 # Co=1, D/C#=0
        self.temp[1] = cmd
        self.i2c.writeto(self.addr, self.temp)

    def write_data(self, buf):
        self.i2c.writeto(self.addr, b'\x40' + buf)


class SSD1306_SPI(SSD1306):
    def __init__(self, width, height, spi, dc, res, cs, external_vcc=False, color=framebuf.MONO_VLSB):
        self.rate = 10 * 1024 * 1024
        dc.init(dc.OUT, value=0)
        res.init(res.OUT, value=0)
        cs.init(cs.OUT, value=1)
        self.spi = spi
        self.dc = dc
        self.res = res
        self.cs = cs
        import time
        self.res(1)
        time.sleep_ms(1)
        self.res(0)
        time.sleep_ms(10)
        self.res(1)
        super().__init__(width, height, external_vcc, color)

    def write_cmd(self, cmd):
        self.spi.init(baudrate=self.rate, polarity=0, phase=0)
        self.cs(1)
        self.dc(0)
        self.cs(0)
        self.spi.write(bytearray([cmd]))
        self.cs(1)

    def write_data(self, buf):
        self.spi.init(baudrate=self.rate, polarity=0, phase=0)
        self.cs(1)
        self.dc(1)
        self.cs(0)
        self.spi.write(buf)
        self.cs(1)

```