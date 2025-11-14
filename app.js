// Letter Garden - Interactive Botanical Typography with Save Features
class LetterGarden {
    constructor() {
        this.svg = document.getElementById('gardenSvg');
        this.wordInput = document.getElementById('wordInput');
        this.clearButton = document.getElementById('clearButton');
        this.plantCount = 0;
        this.currentPlants = [];
        this.currentWord = '';
        
        // Save functionality elements
        this.saveToolbar = document.getElementById('saveToolbar');
        this.exportPngBtn = document.getElementById('exportPngBtn');
        this.exportSvgBtn = document.getElementById('exportSvgBtn');
        this.generateCodeBtn = document.getElementById('generateCodeBtn');
        this.saveGardenBtn = document.getElementById('saveGardenBtn');
        this.openGalleryBtn = document.getElementById('openGalleryBtn');
        this.gardenCodeInput = document.getElementById('gardenCodeInput');
        this.loadCodeBtn = document.getElementById('loadCodeBtn');
        
        // Modals
        this.saveGardenModal = document.getElementById('saveGardenModal');
        this.gardenCodeModal = document.getElementById('gardenCodeModal');
        this.galleryModal = document.getElementById('galleryModal');
        this.statusToast = document.getElementById('statusToast');
        
        // Complete letter to plant mapping system
        this.letterMappings = {
            'A': { name: 'Aster', stemHeight: 120, stemColor: '#4a5d23', leafShape: 'narrow', leafColor: '#5d7829', flowerType: 'composite', flowerColor: '#8b5fbf', flowerSize: 'small', growthSpeed: 800 },
            'B': { name: 'Broad-leaf', stemHeight: 100, stemColor: '#3d5016', leafShape: 'heart', leafColor: '#6b8532', flowerType: 'bell', flowerColor: '#ffffff', flowerSize: 'medium', growthSpeed: 1200 },
            'C': { name: 'Climbing Vine', stemHeight: 140, stemColor: '#2d4011', leafShape: 'oval', leafColor: '#5a7326', flowerType: 'cascading', flowerColor: '#dc3545', flowerSize: 'small', growthSpeed: 600 },
            'D': { name: 'Dandelion', stemHeight: 80, stemColor: '#4a5d23', leafShape: 'lobed', leafColor: '#5d7829', flowerType: 'composite', flowerColor: '#ffd700', flowerSize: 'medium', growthSpeed: 600 },
            'E': { name: 'Elegant Lily', stemHeight: 130, stemColor: '#3d5016', leafShape: 'narrow', leafColor: '#5a7326', flowerType: 'trumpet', flowerColor: '#ffffff', flowerSize: 'large', growthSpeed: 800 },
            'F': { name: 'Fern', stemHeight: 90, stemColor: '#2d4011', leafShape: 'frond', leafColor: '#4a5d23', flowerType: 'none', flowerColor: '#5d7829', flowerSize: 'none', growthSpeed: 700 },
            'G': { name: 'Grass', stemHeight: 60, stemColor: '#3d5016', leafShape: 'blade', leafColor: '#6b8532', flowerType: 'seed', flowerColor: '#8fbc8f', flowerSize: 'tiny', growthSpeed: 500 },
            'H': { name: 'Hibiscus', stemHeight: 110, stemColor: '#4a5d23', leafShape: 'palmate', leafColor: '#5d7829', flowerType: 'large', flowerColor: '#ff6b9d', flowerSize: 'huge', growthSpeed: 900 },
            'I': { name: 'Iris', stemHeight: 125, stemColor: '#2d4011', leafShape: 'sword', leafColor: '#5a7326', flowerType: 'iris', flowerColor: '#6a5acd', flowerSize: 'large', growthSpeed: 850 },
            'J': { name: 'Jasmine', stemHeight: 95, stemColor: '#3d5016', leafShape: 'small-oval', leafColor: '#6b8532', flowerType: 'star', flowerColor: '#ffffff', flowerSize: 'tiny', growthSpeed: 750 },
            'K': { name: 'Kelp', stemHeight: 160, stemColor: '#2d4011', leafShape: 'wavy', leafColor: '#4a5d23', flowerType: 'none', flowerColor: '#8fbc8f', flowerSize: 'none', growthSpeed: 1000 },
            'L': { name: 'Lotus', stemHeight: 85, stemColor: '#4a5d23', leafShape: 'circular', leafColor: '#5d7829', flowerType: 'cup', flowerColor: '#ffb6c1', flowerSize: 'large', growthSpeed: 900 },
            'M': { name: 'Maple', stemHeight: 105, stemColor: '#3d5016', leafShape: 'maple', leafColor: '#6b8532', flowerType: 'cluster', flowerColor: '#32cd32', flowerSize: 'small', growthSpeed: 800 },
            'N': { name: 'Narcissus', stemHeight: 75, stemColor: '#2d4011', leafShape: 'narrow', leafColor: '#5a7326', flowerType: 'trumpet', flowerColor: '#ffffff', flowerSize: 'medium', growthSpeed: 700 },
            'O': { name: 'Oak', stemHeight: 115, stemColor: '#4a5d23', leafShape: 'lobed', leafColor: '#5d7829', flowerType: 'acorn', flowerColor: '#8b4513', flowerSize: 'small', growthSpeed: 950 },
            'P': { name: 'Poppy', stemHeight: 90, stemColor: '#3d5016', leafShape: 'cut', leafColor: '#6b8532', flowerType: 'cup', flowerColor: '#ff0000', flowerSize: 'large', growthSpeed: 650 },
            'Q': { name: 'Queen Anne\'s Lace', stemHeight: 135, stemColor: '#2d4011', leafShape: 'feathery', leafColor: '#5a7326', flowerType: 'umbrella', flowerColor: '#ffffff', flowerSize: 'medium', growthSpeed: 850 },
            'R': { name: 'Rose', stemHeight: 100, stemColor: '#4a5d23', leafShape: 'compound', leafColor: '#5d7829', flowerType: 'layered', flowerColor: '#dc143c', flowerSize: 'large', growthSpeed: 900 },
            'S': { name: 'Sunflower', stemHeight: 180, stemColor: '#3d5016', leafShape: 'large-oval', leafColor: '#6b8532', flowerType: 'composite', flowerColor: '#ffff00', flowerSize: 'huge', growthSpeed: 1100 },
            'T': { name: 'Tulip', stemHeight: 85, stemColor: '#2d4011', leafShape: 'broad', leafColor: '#5a7326', flowerType: 'cup', flowerColor: '#ff69b4', flowerSize: 'medium', growthSpeed: 700 },
            'U': { name: 'Umbrella Plant', stemHeight: 70, stemColor: '#4a5d23', leafShape: 'radiating', leafColor: '#5d7829', flowerType: 'tropical', flowerColor: '#00fa9a', flowerSize: 'medium', growthSpeed: 800 },
            'V': { name: 'Violet', stemHeight: 50, stemColor: '#3d5016', leafShape: 'heart', leafColor: '#6b8532', flowerType: 'small', flowerColor: '#9370db', flowerSize: 'small', growthSpeed: 600 },
            'W': { name: 'Willow', stemHeight: 120, stemColor: '#2d4011', leafShape: 'narrow-droop', leafColor: '#5a7326', flowerType: 'catkin', flowerColor: '#90ee90', flowerSize: 'small', growthSpeed: 850 },
            'X': { name: 'Exotic Orchid', stemHeight: 95, stemColor: '#4a5d23', leafShape: 'succulent', leafColor: '#5d7829', flowerType: 'complex', flowerColor: '#ff1493', flowerSize: 'large', growthSpeed: 950 },
            'Y': { name: 'Yucca', stemHeight: 150, stemColor: '#3d5016', leafShape: 'spiky', leafColor: '#6b8532', flowerType: 'spike', flowerColor: '#ffffff', flowerSize: 'medium', growthSpeed: 1000 },
            'Z': { name: 'Zinnia', stemHeight: 85, stemColor: '#2d4011', leafShape: 'oval', leafColor: '#5a7326', flowerType: 'composite', flowerColor: '#ff4500', flowerSize: 'medium', growthSpeed: 750 }
        };
        
        this.init();
    }

    init() {
        this.wordInput.addEventListener('input', (e) => this.handleInput(e));
        this.clearButton.addEventListener('click', () => this.clearGarden());
        
        // Only allow A-Z letters
        this.wordInput.addEventListener('keypress', (e) => {
            const char = e.key.toUpperCase();
            if (!/[A-Z]/.test(char) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });

        // Save functionality event listeners
        this.exportPngBtn.addEventListener('click', () => this.exportAsPNG());
        this.exportSvgBtn.addEventListener('click', () => this.exportAsSVG());
        this.generateCodeBtn.addEventListener('click', () => this.generateGardenCode());
        this.saveGardenBtn.addEventListener('click', () => this.showSaveModal());
        this.openGalleryBtn.addEventListener('click', () => this.showGallery());
        this.loadCodeBtn.addEventListener('click', () => this.loadGardenCode());

        // Modal event listeners
        this.initModals();
    }

    initModals() {
        // Close modals when clicking backdrop or close button
        document.querySelectorAll('.modal').forEach(modal => {
            const backdrop = modal.querySelector('.modal-backdrop');
            const closeBtn = modal.querySelector('.modal-close');
            
            if (backdrop) backdrop.addEventListener('click', () => this.hideModal(modal));
            if (closeBtn) closeBtn.addEventListener('click', () => this.hideModal(modal));
        });

        // Save garden modal
        document.getElementById('confirmSaveBtn').addEventListener('click', () => this.saveGarden());
        document.getElementById('cancelSaveBtn').addEventListener('click', () => this.hideModal(this.saveGardenModal));

        // Garden code modal
        document.getElementById('copyCodeBtn').addEventListener('click', () => this.copyGardenCode());
        document.getElementById('closeCodeBtn').addEventListener('click', () => this.hideModal(this.gardenCodeModal));

        // Gallery modal
        document.getElementById('closeGalleryBtn').addEventListener('click', () => this.hideModal(this.galleryModal));
    }

    handleInput(e) {
        const word = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        e.target.value = word;
        
        if (word) {
            this.clearGarden();
            this.growWord(word);
            this.currentWord = word;
        } else {
            this.hideSaveToolbar();
            this.currentWord = '';
        }
    }

    clearGarden() {
        this.svg.querySelectorAll('.plant-group').forEach(plant => plant.remove());
        this.currentPlants = [];
        this.plantCount = 0;
        this.hideSaveToolbar();
    }

    growWord(word) {
        const letters = word.split('');
        const spacing = Math.min(100, 1000 / letters.length);
        const startX = (1200 - (letters.length - 1) * spacing) / 2;

        letters.forEach((letter, index) => {
            setTimeout(() => {
                const x = startX + index * spacing;
                this.createPlant(letter, x, index);
            }, index * 300);
        });

        // Show save toolbar after garden is grown
        const maxGrowthTime = Math.max(...letters.map(letter => 
            this.letterMappings[letter]?.growthSpeed || 800
        ));
        setTimeout(() => {
            this.showSaveToolbar();
        }, letters.length * 300 + maxGrowthTime + 2000);
    }

    showSaveToolbar() {
        this.saveToolbar.classList.remove('hidden');
        setTimeout(() => {
            this.saveToolbar.classList.add('visible');
        }, 50);
    }

    hideSaveToolbar() {
        this.saveToolbar.classList.remove('visible');
        setTimeout(() => {
            this.saveToolbar.classList.add('hidden');
        }, 300);
    }

    // Save functionality methods
    async exportAsPNG() {
        if (!this.currentWord) return;
        
        this.showStatus('Generating PNG...', 'info');
        
        try {
            const canvas = await html2canvas(this.svg.parentElement, {
                backgroundColor: '#0f1419',
                width: 1920,
                height: 1080,
                scale: 1
            });
            
            const link = document.createElement('a');
            link.download = `garden-${this.currentWord.toLowerCase()}-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            this.showStatus('PNG exported successfully!', 'success');
        } catch (error) {
            this.showStatus('Failed to export PNG', 'error');
            console.error('PNG export error:', error);
        }
    }

    exportAsSVG() {
        if (!this.currentWord) return;
        
        try {
            const svgData = new XMLSerializer().serializeToString(this.svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const link = document.createElement('a');
            link.download = `garden-${this.currentWord.toLowerCase()}-${Date.now()}.svg`;
            link.href = svgUrl;
            link.click();
            
            URL.revokeObjectURL(svgUrl);
            this.showStatus('SVG exported successfully!', 'success');
        } catch (error) {
            this.showStatus('Failed to export SVG', 'error');
            console.error('SVG export error:', error);
        }
    }

    generateGardenCode() {
        if (!this.currentWord) return;
        
        const code = this.encodeGarden(this.currentWord);
        document.getElementById('generatedCode').value = code;
        this.showModal(this.gardenCodeModal);
    }

    encodeGarden(word) {
        // Simple encoding: GARDEN-WORD-CHECKSUM
        const wordEncoded = word.toUpperCase();
        const checksum = this.generateChecksum(word);
        return `GARDEN-${wordEncoded}-${checksum}`;
    }

    generateChecksum(word) {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            const char = word.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36).substring(0, 4).toUpperCase();
    }

    loadGardenCode() {
        const code = this.gardenCodeInput.value.trim().replace(/\s/g, '');
        if (!code) return;
        
        try {
            const word = this.decodeGarden(code);
            if (word) {
                this.wordInput.value = word;
                this.clearGarden();
                this.growWord(word);
                this.currentWord = word;
                this.gardenCodeInput.value = '';
                this.showStatus('Garden loaded successfully!', 'success');
            } else {
                this.showStatus('Invalid garden code', 'error');
            }
        } catch (error) {
            this.showStatus('Failed to load garden code', 'error');
            console.error('Garden code error:', error);
        }
    }

    decodeGarden(code) {
        const parts = code.split('-');
        if (parts.length !== 3 || parts[0] !== 'GARDEN') {
            return null;
        }
        
        const word = parts[1];
        const providedChecksum = parts[2];
        const calculatedChecksum = this.generateChecksum(word);
        
        // Verify checksum
        if (providedChecksum !== calculatedChecksum) {
            return null;
        }
        
        // Verify word contains only valid letters
        if (!/^[A-Z]+$/.test(word)) {
            return null;
        }
        
        return word;
    }

    showSaveModal() {
        if (!this.currentWord) return;
        
        document.getElementById('gardenName').value = `${this.currentWord} Garden`;
        this.showModal(this.saveGardenModal);
    }

    saveGarden() {
        const name = document.getElementById('gardenName').value.trim();
        if (!name || !this.currentWord) return;
        
        const gardenData = {
            id: Date.now(),
            name: name,
            word: this.currentWord,
            created: new Date().toISOString(),
            preview: this.currentWord
        };
        
        try {
            let savedGardens = JSON.parse(localStorage.getItem('letterGardens') || '[]');
            savedGardens.push(gardenData);
            localStorage.setItem('letterGardens', JSON.stringify(savedGardens));
            
            this.hideModal(this.saveGardenModal);
            this.showStatus('Garden saved successfully!', 'success');
        } catch (error) {
            this.showStatus('Failed to save garden', 'error');
            console.error('Save error:', error);
        }
    }

    showGallery() {
        try {
            const savedGardens = JSON.parse(localStorage.getItem('letterGardens') || '[]');
            this.renderGallery(savedGardens);
            this.showModal(this.galleryModal);
        } catch (error) {
            this.showStatus('Failed to load gallery', 'error');
            console.error('Gallery error:', error);
        }
    }

    renderGallery(gardens) {
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (gardens.length === 0) {
            galleryGrid.innerHTML = `
                <div class="gallery-empty">
                    <p>No saved gardens yet. Create a garden and save it to see it here!</p>
                </div>
            `;
            return;
        }
        
        galleryGrid.innerHTML = gardens.map(garden => `
            <div class="gallery-item" data-garden-id="${garden.id}">
                <div class="gallery-preview">${garden.word}</div>
                <div class="gallery-info">
                    <h4>${garden.name}</h4>
                    <div class="gallery-meta">
                        Word: ${garden.word} • ${new Date(garden.created).toLocaleDateString()}
                    </div>
                    <div class="gallery-actions">
                        <button class="btn btn--primary btn--sm" onclick="letterGarden.loadFromGallery('${garden.word}')">Load</button>
                        <button class="btn btn--secondary btn--sm" onclick="letterGarden.deleteFromGallery(${garden.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadFromGallery(word) {
        this.wordInput.value = word;
        this.clearGarden();
        this.growWord(word);
        this.currentWord = word;
        this.hideModal(this.galleryModal);
        this.showStatus('Garden loaded from gallery!', 'success');
    }

    deleteFromGallery(gardenId) {
        try {
            let savedGardens = JSON.parse(localStorage.getItem('letterGardens') || '[]');
            savedGardens = savedGardens.filter(garden => garden.id !== gardenId);
            localStorage.setItem('letterGardens', JSON.stringify(savedGardens));
            
            this.renderGallery(savedGardens);
            this.showStatus('Garden deleted', 'success');
        } catch (error) {
            this.showStatus('Failed to delete garden', 'error');
            console.error('Delete error:', error);
        }
    }

    copyGardenCode() {
        const codeInput = document.getElementById('generatedCode');
        codeInput.select();
        document.execCommand('copy');
        this.showStatus('Garden code copied to clipboard!', 'success');
    }

    // Modal utilities
    showModal(modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
        }, 50);
    }

    hideModal(modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    // Status toast
    showStatus(message, type = 'success') {
        const toast = this.statusToast;
        const messageEl = document.getElementById('statusMessage');
        
        messageEl.textContent = message;
        toast.className = `status-toast ${type}`;
        
        toast.classList.add('visible');
        
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 3000);
    }

    // Original plant creation methods (unchanged)
    createPlant(letter, x, plantIndex) {
        const mapping = this.letterMappings[letter];
        if (!mapping) return;

        const plantGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        plantGroup.classList.add('plant-group');
        plantGroup.setAttribute('data-letter', letter);

        // Create stem
        const stem = this.createStem(mapping, x);
        plantGroup.appendChild(stem);

        // Create leaves
        const leaves = this.createLeaves(mapping, x);
        leaves.forEach(leaf => plantGroup.appendChild(leaf));

        // Create flower (if the plant has flowers)
        if (mapping.flowerType !== 'none') {
            const flower = this.createFlower(mapping, x);
            plantGroup.appendChild(flower);
        }

        this.svg.appendChild(plantGroup);
        this.currentPlants.push(plantGroup);

        // Add swaying animation after growth
        setTimeout(() => {
            plantGroup.classList.add('grown');
        }, mapping.growthSpeed + 2000);
    }

    createStem(mapping, x) {
        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const baseY = 580;
        const topY = baseY - mapping.stemHeight;
        
        // Create slightly curved stem
        const curve = 10 + Math.random() * 20;
        const midX = x + (Math.random() - 0.5) * curve;
        
        const pathData = `M ${x} ${baseY} Q ${midX} ${(baseY + topY) / 2} ${x} ${topY}`;
        
        stem.setAttribute('d', pathData);
        stem.classList.add('plant-stem');
        stem.style.stroke = mapping.stemColor;
        stem.style.strokeWidth = '4';
        stem.style.fill = 'none';
        
        return stem;
    }

    createLeaves(mapping, x) {
        const leaves = [];
        const leafCount = this.getLeafCount(mapping.leafShape);
        const baseY = 580;
        const stemHeight = mapping.stemHeight;
        
        for (let i = 0; i < leafCount; i++) {
            const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const leafY = baseY - (stemHeight * (0.3 + i * 0.3));
            const leafSize = this.getLeafSize(mapping.leafShape);
            const side = i % 2 === 0 ? -1 : 1;
            const leafX = x + side * (20 + Math.random() * 10);
            
            const leafPath = this.getLeafPath(mapping.leafShape, leafX, leafY, leafSize, side);
            
            leaf.setAttribute('d', leafPath);
            leaf.classList.add('plant-leaf');
            leaf.style.fill = mapping.leafColor;
            leaf.style.stroke = mapping.leafColor;
            leaf.style.fillOpacity = '0.8';
            
            leaves.push(leaf);
        }
        
        return leaves;
    }

    createFlower(mapping, x) {
        const flower = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        flower.classList.add('plant-flower');
        
        const baseY = 580;
        const flowerY = baseY - mapping.stemHeight - 5;
        const flowerSize = this.getFlowerSize(mapping.flowerSize);
        
        const flowerElement = this.getFlowerElement(mapping.flowerType, x, flowerY, flowerSize, mapping.flowerColor);
        flower.appendChild(flowerElement);
        
        return flower;
    }

    getLeafCount(leafShape) {
        const counts = {
            'narrow': 2, 'heart': 3, 'oval': 2, 'lobed': 4, 'frond': 6,
            'blade': 8, 'palmate': 2, 'sword': 4, 'small-oval': 3,
            'wavy': 3, 'circular': 1, 'maple': 2, 'cut': 3, 'feathery': 4,
            'compound': 3, 'large-oval': 2, 'broad': 2, 'radiating': 5,
            'narrow-droop': 4, 'succulent': 2, 'spiky': 6
        };
        return counts[leafShape] || 2;
    }

    getLeafSize(leafShape) {
        const sizes = {
            'narrow': 15, 'heart': 25, 'oval': 20, 'lobed': 18, 'frond': 12,
            'blade': 8, 'palmate': 30, 'sword': 35, 'small-oval': 10,
            'wavy': 40, 'circular': 35, 'maple': 28, 'cut': 22, 'feathery': 15,
            'compound': 18, 'large-oval': 35, 'broad': 25, 'radiating': 20,
            'narrow-droop': 25, 'succulent': 30, 'spiky': 40
        };
        return sizes[leafShape] || 20;
    }

    getLeafPath(leafShape, x, y, size, side) {
        switch (leafShape) {
            case 'heart':
                return `M ${x} ${y} C ${x - size * side} ${y - size/2} ${x - size * side} ${y - size} ${x} ${y - size * 0.7} C ${x + size * side} ${y - size} ${x + size * side} ${y - size/2} ${x} ${y}`;
            case 'oval':
                return `M ${x} ${y} C ${x + size * side} ${y - size/3} ${x + size * side} ${y - size} ${x} ${y - size} C ${x - size * side} ${y - size} ${x - size * side} ${y - size/3} ${x} ${y}`;
            case 'maple':
                return `M ${x} ${y} L ${x + size * side * 0.7} ${y - size * 0.3} L ${x + size * side} ${y - size * 0.8} L ${x + size * side * 0.3} ${y - size} L ${x - size * side * 0.3} ${y - size} L ${x - size * side} ${y - size * 0.8} L ${x - size * side * 0.7} ${y - size * 0.3} Z`;
            case 'sword':
                return `M ${x} ${y} L ${x + size * side * 0.3} ${y - size * 2} L ${x - size * side * 0.3} ${y - size * 2} Z`;
            default:
                return `M ${x} ${y} C ${x + size * side} ${y - size/2} ${x + size * side * 0.5} ${y - size} ${x} ${y - size} C ${x - size * side * 0.5} ${y - size} ${x - size * side} ${y - size/2} ${x} ${y}`;
        }
    }

    getFlowerSize(size) {
        const sizes = { 'tiny': 8, 'small': 12, 'medium': 18, 'large': 25, 'huge': 35, 'none': 0 };
        return sizes[size] || 15;
    }

    getFlowerElement(flowerType, x, y, size, color) {
        const flower = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        switch (flowerType) {
            case 'composite':
                // Daisy-like flower
                for (let i = 0; i < 12; i++) {
                    const angle = (i * 30) * Math.PI / 180;
                    const petal = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                    petal.setAttribute('cx', x + Math.cos(angle) * size * 0.7);
                    petal.setAttribute('cy', y + Math.sin(angle) * size * 0.7);
                    petal.setAttribute('rx', size * 0.3);
                    petal.setAttribute('ry', size * 0.8);
                    petal.setAttribute('transform', `rotate(${i * 30} ${x + Math.cos(angle) * size * 0.7} ${y + Math.sin(angle) * size * 0.7})`);
                    petal.style.fill = color;
                    flower.appendChild(petal);
                }
                // Center
                const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                center.setAttribute('cx', x);
                center.setAttribute('cy', y);
                center.setAttribute('r', size * 0.4);
                center.style.fill = '#ffd700';
                flower.appendChild(center);
                break;
                
            case 'bell':
                const bell = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                bell.setAttribute('d', `M ${x} ${y} C ${x - size} ${y - size/2} ${x - size} ${y - size} ${x} ${y - size * 1.2} C ${x + size} ${y - size} ${x + size} ${y - size/2} ${x} ${y}`);
                bell.style.fill = color;
                bell.style.fillOpacity = '0.8';
                flower.appendChild(bell);
                break;
                
            case 'trumpet':
                const trumpet = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                trumpet.setAttribute('d', `M ${x} ${y} C ${x - size * 0.3} ${y - size * 0.5} ${x - size * 0.8} ${y - size} ${x} ${y - size * 1.5} C ${x + size * 0.8} ${y - size} ${x + size * 0.3} ${y - size * 0.5} ${x} ${y}`);
                trumpet.style.fill = color;
                flower.appendChild(trumpet);
                break;
                
            default:
                // Simple circular flower
                const simple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                simple.setAttribute('cx', x);
                simple.setAttribute('cy', y);
                simple.setAttribute('r', size);
                simple.style.fill = color;
                flower.appendChild(simple);
                break;
        }
        
        return flower;
    }
}

// Initialize the garden when DOM is loaded
let letterGarden;
document.addEventListener('DOMContentLoaded', () => {
    letterGarden = new LetterGarden();
});