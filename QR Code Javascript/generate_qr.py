import qrcode

def generate_qr_code(url, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)

if __name__ == "__main__":
    url = input("Enter the URL to generate QR code: ").strip()
    filename = input("Enter the filename to save QR code (e.g., qrcode.png): ").strip()

    generate_qr_code(url, filename)
    print(f"QR code saved as {filename}")
