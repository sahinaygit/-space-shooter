import sys
from PIL import Image

def process_image(input_path, output_path, bg_type='green', rotate=0):
    img = Image.open(input_path).convert("RGBA")
    
    if rotate != 0:
        img = img.rotate(rotate, expand=True)

    width, height = img.size
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            if bg_type == 'green':
                if g > 150 and r < 100 and b < 100:
                    pixels[x, y] = (r, g, b, 0)
                elif g > r * 1.5 and g > b * 1.5 and g > 60:
                    alpha = max(0, 255 - int((g - max(r, b)) * 2))
                    pixels[x, y] = (r, min(g, max(r, b)), b, alpha)
            elif bg_type == 'black':
                # Remove pure black and very dark pixels
                if r < 20 and g < 20 and b < 20:
                    pixels[x, y] = (r, g, b, 0)
                elif r < 50 and g < 50 and b < 50:
                    alpha = int((max(r,g,b) - 20) * 255 / 30)
                    pixels[x, y] = (r, g, b, max(0, min(255, alpha)))
                    
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 0)
