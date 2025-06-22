class NeuronNetwork {
    constructor() {
        this.canvas = document.getElementById('neuronCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.neurons = [];
        this.connections = [];
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.activeRadius = 200;
        this.connectionDistance = 200;
        this.neuronDensity = 15000; // 높을수록 뉴런이 적어짐
        
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.createNeurons();
        this.createConnections();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createNeurons(); // 리사이즈 시 뉴런 재생성
    }

    createNeurons() {
        this.neurons = [];
        const neuronCount = Math.floor((this.canvas.width * this.canvas.height) / this.neuronDensity);
        
        for (let i = 0; i < neuronCount; i++) {
            this.neurons.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1 + 1,
                originalRadius: Math.random() * 1 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    createConnections() {
        this.connections = [];
        this.neurons.forEach((neuron, i) => {
            for (let j = i + 1; j < this.neurons.length; j++) {
                const other = this.neurons[j];
                const distance = this.getDistance(neuron, other);
                
                if (distance < this.connectionDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        distance: distance,
                        opacity: Math.random() * 0.3 + 0.1
                    });
                }
            }
        });
    }

    getDistance(p1, p2) {
        return Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createConnections();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    update() {
        // 뉴런 움직임 업데이트
        this.neurons.forEach(neuron => {
            neuron.x += neuron.vx;
            neuron.y += neuron.vy;

            // 화면 경계 처리
            if (neuron.x < 0 || neuron.x > this.canvas.width) neuron.vx *= -1;
            if (neuron.y < 0 || neuron.y > this.canvas.height) neuron.vy *= -1;

            // 마우스와의 거리에 따른 크기 조정
            const distanceToMouse = this.getDistance(neuron, this.mouse);
            if (distanceToMouse < this.activeRadius) {
                const scale = 1 + (1 - distanceToMouse / this.activeRadius) * 2;
                neuron.radius = neuron.originalRadius * scale;
            } else {
                neuron.radius = neuron.originalRadius;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 연결선 그리기
        this.connections.forEach(connection => {
            const from = this.neurons[connection.from];
            const to = this.neurons[connection.to];
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            
            const distanceToMouse = this.getDistance(
                { x: midX, y: midY },
                this.mouse
            );
            
            let opacity = connection.opacity;
            if (distanceToMouse < this.activeRadius) {
                opacity = connection.opacity * (1 + (1 - distanceToMouse / this.activeRadius));
            }

            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = `rgba(224, 191, 184, ${opacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
        });

        // 뉴런 그리기
        this.neurons.forEach(neuron => {
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(224, 191, 184, 0.8)';
            this.ctx.fill();
        });
    }

    animate = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate);
    }
}

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    new NeuronNetwork();
}); 