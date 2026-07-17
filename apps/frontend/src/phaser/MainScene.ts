import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Rectangle;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private info?: Phaser.GameObjects.Text;

  constructor() {
    super('MainScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f172a');

    const graphics = this.add.graphics();
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 20; y++) {
        const color = (x + y) % 5 === 0 ? 0x1f6f50 : (x + y) % 7 === 0 ? 0x2a4365 : 0x22543d;
        graphics.fillStyle(color, 1);
        graphics.fillRect(x * 32, y * 32, 31, 31);
      }
    }

    graphics.fillStyle(0x3b82f6, 1);
    graphics.fillRect(0, 420, 1024, 80);

    graphics.fillStyle(0x6b7280, 1);
    graphics.fillRect(280, 180, 140, 100);
    graphics.fillStyle(0xb45309, 1);
    graphics.fillRect(310, 130, 80, 50);

    this.player = this.add.rectangle(140, 140, 22, 22, 0xf8fafc);
    this.info = this.add.text(16, 16, 'Explore AI Kingdoms', { color: '#e2e8f0', fontSize: '18px' });
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  update() {
    if (!this.player || !this.cursors) return;

    const speed = 2.5;
    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;

    this.player.x = Phaser.Math.Clamp(this.player.x, 0, 1024);
    this.player.y = Phaser.Math.Clamp(this.player.y, 0, 640);
    this.info?.setText(`Explore AI Kingdoms · (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`);
  }
}
