class MindMap {
    constructor() {
        this.canvas = document.getElementById('mindmapCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.centerNode = null;
        this.activeRadius = 200;
        this.nodeDensity = 20000;
        this.rotationSpeed = 0.0003;
        this.time = 0;
        this.isVisible = false;
        this.animationFrame = null;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.createNodes();
        this.createCenterNode();
        this.createConnections();
        this.checkVisibility();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
    }

    createNodes() {
        this.nodes = [];
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / this.nodeDensity);
        
        for (let i = 0; i < nodeCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * Math.min(this.canvas.width, this.canvas.height) * 0.3;
            
            this.nodes.push({
                x: this.canvas.width / 2 + Math.cos(angle) * radius,
                y: this.canvas.height / 2 + Math.sin(angle) * radius,
                size: Math.random() * 1.5 + 0.5,
                angle: angle,
                radius: radius,
                speed: this.rotationSpeed
            });
        }
    }

    createCenterNode() {
        this.centerNode = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 3
        };
    }

    createConnections() {
        this.connections = [];
        
        this.nodes.forEach((node, i) => {
            if (Math.random() < 0.3) {
                this.connections.push({
                    from: node,
                    to: this.centerNode,
                    opacity: 0.1
                });
            }
        });
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
            this.createCenterNode();
            this.createConnections();
        });

        window.addEventListener('scroll', () => {
            this.checkVisibility();
        });

        let timeout;
        this.canvas.addEventListener('mousemove', (e) => {
            if (timeout) return;
            timeout = setTimeout(() => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
                timeout = null;
            }, 16);
        });
    }

    checkVisibility() {
        const rect = this.canvas.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !this.isVisible) {
            this.isVisible = true;
            this.startAnimation();
        } else if (!isVisible && this.isVisible) {
            this.isVisible = false;
            this.stopAnimation();
        }
    }

    startAnimation() {
        if (!this.animationFrame) {
            this.animate();
        }
    }

    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    update() {
        this.time += 0.016;

        this.nodes.forEach(node => {
            node.angle += node.speed;
            node.x = this.canvas.width / 2 + Math.cos(node.angle) * node.radius;
            node.y = this.canvas.height / 2 + Math.sin(node.angle) * node.radius;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.beginPath();
        this.connections.forEach(connection => {
            this.ctx.moveTo(connection.from.x, connection.from.y);
            this.ctx.lineTo(connection.to.x, connection.to.y);
        });
        this.ctx.strokeStyle = 'rgba(224, 191, 184, 0.1)';
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();

        this.ctx.fillStyle = 'rgba(224, 191, 184, 0.8)';
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        if (this.centerNode) {
            this.ctx.beginPath();
            this.ctx.arc(this.centerNode.x, this.centerNode.y, this.centerNode.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(224, 191, 184, 0.9)';
            this.ctx.fill();
        }
    }

    animate = () => {
        if (!this.isVisible) return;
        
        this.update();
        this.draw();
        this.animationFrame = requestAnimationFrame(this.animate);
    }
}

window.addEventListener('load', () => {
    const mindmap = new MindMap();
}); 