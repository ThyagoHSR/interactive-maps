document.addEventListener("DOMContentLoaded", function() {
    function createContainer(countryId, countryName) {
        const container = document.createElement("div");
        container.id = `container-${countryId}`;
        container.className = "container-paises";
        container.style.position = "absolute";
        container.style.display = "none";
        container.style.padding = "10px";
        container.style.alignItems = "center";

        const text = document.createElement("p");
        text.className = "tooltip";
        text.textContent = countryName;
        text.style.margin = "0";

        container.appendChild(text);
        document.body.appendChild(container);
        return container;
    }


    function createSVGImage(svgElement, imgSrc) {
        const bbox = svgElement.getBBox();
        const svgNS = "http://www.w3.org/2000/svg";
        const img = document.createElementNS(svgNS, "image");
        img.setAttributeNS("http://www.w3.org/1999/xlink", "href", imgSrc);
        img.setAttribute("x", bbox.x + bbox.width / 2 - 7.5);
        img.setAttribute("y", bbox.y + bbox.height / 2 - 7.5);
        img.setAttribute("width", 15);
        img.setAttribute("height", 15);
        img.setAttribute("preserveAspectRatio", "xMidYMid slice");
        img.style.pointerEvents = "none";
        svgElement.appendChild(img);
        
        return img;
    }

    const tooltipPositions = {  // Posicionar os elementos. ( Selecionar as id dos path. )
        "Brazil": { left: 95, top: -30 },
        "Argentina": { left: 0, top: 10},
		"Uruguai": { left: 10, top:20 },
		"China": { left: 180, top: -40 },
		"India": { left: 0, top: 15 },
		"Namíbia": { left: -100, top: 0 },
		"Zimbábue": { left: 0, top: 50 },
		"África do Sul": { left: 0, top: 10 },
		"Madagascar": { left: 0, top: 10 },
		"República Democrática do Congo": { left: -170, top: -50 },
		"Arábia Saudita": { left: 40, top: 50 },
		"Chade": { left: -130, top: 40 },
		"Nigéria": { left: -70, top: 20 },
		"Níger": { left: -50, top: 35 },
		"Argélia": { left: -20, top: 80 },
		"Mauritânia": { left: -120, top:0 },
		"Costa do Marfim": { left: -100, top:20 },
		"Gana": { left: -30, top:20 },
		"Togo": { left: -40, top:20 },
    };

    const svgElements = document.querySelectorAll('.paises');

    svgElements.forEach(function(svgElement) {
        const countryId = svgElement.getAttribute('id');
        const container = createContainer(countryId, countryId.charAt(0).toUpperCase() + countryId.slice(1));
        const svgImage = createSVGImage(svgElement, '');

        svgElement.addEventListener("mouseover", function() {
            container.style.display = "flex";
            container.classList.add('show');

            const position = tooltipPositions[countryId] || { left: 0, top: 0, bottom:0, };
            const rect = svgElement.getBoundingClientRect();
            container.style.left = `${rect.left + window.scrollX + position.left}px`;
            container.style.top = `${rect.bottom + window.scrollY + position.top}px`;
			container.style.bottom = `${rect.bottom + window.scrollY + position.bottom}px`;

            svgImage.style.display = "block";
        });

        svgElement.addEventListener("mouseout", function() {
            container.style.display = "none";
            container.classList.remove('show');
            svgImage.style.display = "none";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    function createSVGElement(tag, attributes) {
        const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const attr in attributes) {
            elem.setAttribute(attr, attributes[attr]);
        }
        return elem;
    }

    function placeImageOnPath(pathElement, imgSrc) {
        const bbox = pathElement.getBBox();
        const imageGroup = createSVGElement('g', {
            transform: `translate(${bbox.x + bbox.width / 2}, ${bbox.y + bbox.height / 2})`
        });

        const image = createSVGElement('image', {
            x: -7.5,
            y: -7.5,
            width: 15,
            height: 15,
            href: imgSrc,
            'preserveAspectRatio': 'none'
        });

        image.style.pointerEvents = "none";
        imageGroup.appendChild(image);
        pathElement.parentNode.appendChild(imageGroup);
    }

    const svgElements = document.querySelectorAll('.paises');

    svgElements.forEach(function(svgElement) {
        svgElement.addEventListener("mouseover", function() {
            placeImageOnPath(svgElement, 'assets/maps_selector.png');
        });

        svgElement.addEventListener("mouseout", function() {
            const images = svgElement.parentNode.querySelectorAll('g');
            images.forEach(image => image.remove());
        });
    });
});
