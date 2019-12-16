var photoEditor = {
    element: ' <div class="pe-main"><div class="table pe-img-edit" ><div class="tableCell box" id="pe-container"><canvas id="pe-panel"></canvas><label id="pe-uploadImg" style="text-align: center"><p style="color:white; font-size: 36px;">Click to upload image</p><input type="file" class="sr-only" id="pe-input" name="image" accept="image/*"></label><label id="pe-choeseImg" style="text-align: center"></label></div></div><div class="table"><div class="pe-toolbar"><div class="pe-toolbar_button" id="pe-renderBtn" name="Render"><span class="fa fa-eye pe-tooltip"></span><span class="pe-tooltiptext">Render</span></div><div class="pe-toolbar_button" id="pe-downloadBtn" name="Download"><span class="fa fa-download pe-tooltip"></span><span class="pe-tooltiptext">Download</span></div><div class="pe-toolbar_button" id="pe-dragBttn" name="Drag"><span class="fa fa-arrows pe-tooltip"></span><span class="pe-tooltiptext">Drag</span></div><div class="pe-toolbar_button" id="pe-resizeBttn" name="Resize"><span class="fa fa-expand pe-tooltip"></span><span class="pe-tooltiptext">Resize</span></div><div class="pe-sizearea" id="pe-widthInput" style="display: none;"><span>Width</span><input type="text" id="pe-widthValue" style="width: 30px"></div><div class="pe-sizearea" id="pe-heightInput" style="display: none;"><span>Height</span><input type="text" id="pe-heightValue" style="width: 30px"></div><div class="pe-toolbar_button" id="pe-cropBttn" name="Crop"><span class="fa fa-crop pe-tooltip"></span><span class="pe-tooltiptext">Crop</span></div><div class="pe-toolbar_button" id="pe-zoominBttn" name="ZoomIn"><span class="fa fa-search-minus pe-tooltip"></span><span class="pe-tooltiptext">ZoomIn</span></div><div class="pe-toolbar_button" id="pe-zoomoutBttn" name="Zoomout"><span class="fa fa-search-plus pe-tooltip"></span><span class="pe-tooltiptext">ZoomOut</span></div><div class="pe-toolbar_button" id="pe-orientateBttn" name="Zoomout"><span class="fa fa-refresh pe-tooltip"></span><span class="pe-tooltiptext">Orientation</span></div><div class="pe-toolbar_button" id="pe-rotateLeft" style="display: none" name="Rotate Counterclockwise"><span class="fa fa-rotate-left pe-tooltip"></span><span class="pe-tooltiptext">Rotate Counterclockwise</span></div><div class="pe-toolbar_button" id="pe-rotateRight" style="display: none" name="Rotate Clockwise"><span class="fa fa-rotate-right pe-tooltip"></span><span class="pe-tooltiptext">Rotate Clockwise</span></div><div class="pe-toolbar_button" id="pe-vertical" style="display: none"><span class="fa fa-arrows-h pe-tooltip"></span><span class="pe-tooltiptext">Vertical</span></div><div class="pe-toolbar_button" id="pe-horizontal" style="display: none"><span class="fa fa-arrows-v pe-tooltip"></span><span class="pe-tooltiptext">Horizontal</span></div><div class="pe-toolbar_button" id="pe-contrast" name="Contrast"><span class="fa fa-adjust pe-tooltip"></span><span class="pe-tooltiptext">Contrast</span></div><div class="pe-toolbar_button" id="pe-brightness" name="Brightness"><span class="fa fa-sun-o pe-tooltip"></span><span class="pe-tooltiptext">Brighness</span></div><div class="pe-toolbar_button" id="pe-blur" name="Blur"><span class="fa fa-filter pe-tooltip"></span><span class="pe-tooltiptext">Blur</span></div><div class="pe-toolbar_button" id="pe-grayscale" name="Grayscale"><span class="fa fa-snowflake-o pe-tooltip"></span><span class="pe-tooltiptext">Grayscale</span></div><div class="pe-toolbar_button" id="pe-saturate" name="Saturate"><span class="fa fa-diamond pe-tooltip"></span><span class="pe-tooltiptext">Saturate</span></div><div class="pe-toolbar_button" id="pe-filter" name="Saturate"><span class="fa fa-cogs pe-tooltip"></span><span class="pe-tooltiptext">Filter</span></div><div class="pe-toolbar_button" id="pe-undoBttn" name="Undo"><span class="fa fa-mail-reply pe-tooltip"></span><span class="pe-tooltiptext">Undo</span></div><div class="pe-toolbar_button " id="pe-redoBttn" name="Redo"><span class="fa fa-mail-forward pe-tooltip"></span><span class="pe-tooltiptext">Redo</span></div><div class="pe-slidecontainer pe-sizearea" style="display: none" id="pe-slideBar"><input type="range" min="0" max="200" value="100" class="pe-slider" id="pe-rangeBar"><span id="pe-filterValue"></span></div><div id="pe-filterArea" style="display: none"><figure class="pe-brannan pe-tooltip"><img id="pe-brannan" class="pe-img"><span class="pe-tooltiptext">brannan</span></figure><figure class="pe-aden pe-tooltip"><img id="pe-aden" class="pe-img"><span class="pe-tooltiptext">Aden</span></figure><figure class="pe-clarendon pe-tooltip"><img id="pe-clarendon" class="pe-img"><span class="pe-tooltiptext">Clarendon</span></figure><figure class="pe-lofi pe-tooltip" id="style1"><img id="pe-lofi" class="pe-img"><span class="pe-tooltiptext"> Lofi</span></figure><figure class="pe-amaro pe-tooltip"><img id="pe-amaro" class="pe-img"><span class="pe-tooltiptext">Amaro</span></figure><figure class="pe-walden pe-tooltip"><img id="pe-walden" class="pe-img"><span class="pe-tooltiptext">Walden</span></figure><figure class="pe-maven pe-tooltip"><img id="pe-maven" class="pe-img"><span class="pe-tooltiptext">Maven</span></figure><figure class="pe-brooklyn pe-tooltip"><img id="pe-brooklyn" class="pe-img"><span class="pe-tooltiptext">Brooklyn</span></figure><figure class="pe-xpro2 pe-tooltip"><img id="pe-xpro2" class="pe-img"><span class="pe-tooltiptext">Xpro2</span></figure><figure class="pe-toaster pe-tooltip"><img id="pe-toaster" class="pe-img"><span class="pe-tooltiptext">Toaster</span></figure><figure class="pe-stinson pe-tooltip"><img id="pe-stinson" class="pe-img"><span class="pe-tooltiptext">Stinson</span></figure><figure class="pe-inkwell pe-tooltip"><img id="pe-inkwell" class="pe-img"><span class="pe-tooltiptext">Inkwell</span></figure></div><button class="pe-toolbar_button" id="pe-doneBttn" name="Apply" style="display:none;"><span class="fa fa-check"></span></button><button class="pe-toolbar_button" id="pe-cancelBttn" name="Cancel" style="display: none;"><span class="fa fa-close"></span></button></div></div></div>',
    ctx: null,
    image: null,
    click: false,
    downPointX: 0,
    downPointY: 0,
    lastPointX: 0,
    lastPointY: 0,
    hoverBoxSize: 5,
    resize: false,
    canvasBackgroundColor: "#FFFFFF",
    img_arr: [],
    filter: null,
    stack_position: 0,
    active : false,
    currentX : 0,
    currentY : 0,
    initialX : null,
    initialY : null,
    xOffset : 0,
    yOffset : 0,
    dragItem : null,
    container : null,
    zoomValue : 0,
    formatImage : null,
    urlImg : null,
    nameTag: null,
    divShowImg: '<div id = "show_img"></div>',
   
    /**
     * Initlize canvas and handle button event
     *
     */
    init: function(param) {
        tmp_param = document.getElementById(param);
        this.nameTag = tmp_param.nodeName;
        this.urlImg = tmp_param.getAttribute('src');

        document.body.innerHTML = '';
        document.body.insertAdjacentHTML("beforeend", this.divShowImg);
        document.body.insertAdjacentHTML("beforeend", this.element);

        var tmp = this;
        var el = document.getElementsByClassName('pe-toolbar_button');
        this.img_arr = [];
        this.stack_position = 0;
        this.zoomValue = 0;

        for (var i = 0; i < el.length; i++) {
            el[i].style.pointerEvents = 'none';
        }

        this.dragItem = document.getElementById("pe-panel");
        this.container = document.getElementById("pe-container");
        this.ctx = document.getElementById("pe-panel").getContext("2d");
        this.initCanvas(this.urlImg, this.nameTag);

        //value of filter
        this.filter = {
            'pe-toaster' : 'contrast(150%) brightness(90%)',
            'pe-amaro' : 'contrast(90%) brightness(110%) saturate(150%) hue-rotate(-10deg)',
            'pe-brooklyn' : 'contrast(90%) brightness(110%)',
            'pe-clarendon' : 'contrast(120%) saturate(125%)',
            'pe-inkwell' : 'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)',
            'pe-aden' : 'contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg)',
            'pe-stinson' : 'contrast(75%) brightness(115%) saturate(85%)',
            'pe-walden' : 'brightness(110%) saturate(160%) sepia(30%) hue-rotate(350deg)',
            'pe-xpro2' : 'sepia(30%)',
            'pe-maven' : 'contrast(95%) brightness(95%) saturate(150%) sepia(25%)',
            'pe-brannan' : 'contrast(140%) sepia(50%)',
            'pe-lofi' : 'contrast(150%) saturate(110%)'
        };

        //buttons event
        document.getElementById("pe-resizeBttn").onclick = this.changeImageSize.bind(this);
        document.getElementById("pe-contrast").onclick = this.changeImageFilter.bind(this, 'pe-contrast');
        document.getElementById("pe-brightness").onclick = this.changeImageFilter.bind(this, 'pe-brightness');
        document.getElementById("pe-grayscale").onclick = this.changeImageFilter.bind(this, 'pe-grayscale');
        document.getElementById("pe-blur").onclick = this.changeImageFilter.bind(this, 'pe-blur');
        document.getElementById("pe-saturate").onclick = this.changeImageFilter.bind(this, 'pe-saturate');
        document.getElementById("pe-cancelBttn").onclick = this.cancelEditImage.bind(this);
        document.getElementById("pe-orientateBttn").onclick = this.orientateImage.bind(this);
        document.getElementById('pe-zoominBttn').onclick = this.zoom.bind(this, 0.5);
        document.getElementById('pe-zoomoutBttn').onclick = this.zoom.bind(this, 1.5);
        document.getElementById('pe-undoBttn').onclick = this.undo.bind(this);
        document.getElementById('pe-redoBttn').onclick = this.redo.bind(this);

        document.getElementById("pe-renderBtn").addEventListener('click', function () {
            document.getElementsByClassName('pe-main')[0].style.display = 'none';
            tmp.ctx = document.getElementById("pe-panel").getContext("2d");
            tmp.image.src = tmp.ctx.canvas.toDataURL();
            tmp.render(tmp.image.src, 'show_img');
        });

        document.getElementById("pe-downloadBtn").addEventListener('click', function() {
            tmp.ctx = document.getElementById("pe-panel").getContext("2d");
            tmp.image.src = tmp.ctx.canvas.toDataURL();

            var link = document.createElement('a');
            link.download = 'image.' + formatImage;
            link.href = tmp.image.src;
            link.click();
            link.remove();
        });

        document.getElementById('pe-dragBttn').onclick = function(e) {
            tmp.ctx = document.getElementById("pe-panel").getContext("2d");
            tmp.image.src = tmp.ctx.canvas.toDataURL();

            var container = document.querySelector("#pe-container");
            //mouse's mobile event
            container.addEventListener("touchstart", tmp.dragStart.bind(tmp), false);
            container.addEventListener("touchend", tmp.dragEnd.bind(tmp), false);
            container.addEventListener("touchmove", tmp.drag.bind(tmp), false);
            //mouse's mobile pc
            container.addEventListener("mousedown", tmp.dragStart.bind(tmp), false);
            container.addEventListener("mouseup", tmp.dragEnd.bind(tmp), false);
            container.addEventListener("mousemove", tmp.drag.bind(tmp), false);
        };

        document.getElementById("pe-filter").onclick = this.chooseFilter.bind(this);

        document.getElementById("pe-cropBttn").addEventListener('click', function() {
            tmp.ctx = document.getElementById("pe-panel").getContext("2d");
            tmp.image.src = tmp.ctx.canvas.toDataURL();

            tmp.openEditToolBar();

            document.getElementById('pe-cropBttn').style.display = 'inline-block';

            tmp.initEventsOnCanvas();
            document.getElementById("pe-doneBttn").onclick = tmp.cropImage.bind(tmp);

            //remove drag event
            var container = document.querySelector("#pe-container");
            //mouse's mobile event
            container.removeEventListener("touchstart", tmp.dragStart);
            container.removeEventListener("touchend", tmp.dragEnd);
            container.removeEventListener("touchmove", tmp.drag);
            //mouse's mobile event
            container.removeEventListener("mousedown", tmp.dragStart);
            container.removeEventListener("mouseup", tmp.dragEnd);
            container.removeEventListener("mousemove", tmp.drag);
        });
    },
    /**
     * get uploaded image and draw canvas
     *
     */

    initCanvas: function(urlImg, nameTag) {
        this.image = new Image();
        this.image.setAttribute('crossOrigin', 'anonymous'); //optional,  it is needed only if your image is not avalible on same domain.
        var tmp = this;

        if(nameTag == 'IMG') {
            this.image.src = urlImg;
            formatImage = urlImg.split('.').splice(-1)[0];

            format = ['png', 'jpg', 'jpeg', 'gif']; 
            if(!format.includes(formatImage)){
                formatImage = 'png';
            }
        }

        document.getElementById('pe-input').addEventListener('change', function (e) {
            var files = e.target.files;

            if (files && files.length > 0) {
                var reader = new FileReader();
                formatImage = files['0'].name.split('.')[1];

                reader.onload = function (e) {
                    tmp.image.src = reader.result;
                };
                reader.readAsDataURL(files[0]);
            }
        });

        this.image.onload = function() {
            this.ctx.canvas.width = this.image.width;
            this.ctx.canvas.height = this.image.height;
            this.ctx.drawImage(this.image, 0, 0);
            var el = document.getElementsByClassName('pe-toolbar_button');
            for (var i = 0; i < el.length; i++) {
                el[i].style.pointerEvents = '';
            }

            document.getElementById('pe-uploadImg').style.display = 'none';

            var tempCtx = document.getElementById('pe-panel').getContext('2d');
            //add image to img_arr (for undo/redo)
            var newImg = new Image();
            newImg.src = tempCtx.canvas.toDataURL();

            var imgValue = {
                img: newImg,
                width: tempCtx.canvas.width,
                height: tempCtx.canvas.height
            }

            this.img_arr.push(imgValue);

        }.bind(this);
    },

    /**
     * open edit icon and hide toolbar
     *
     */
    openEditToolBar: function() {
        var el = document.getElementsByClassName('pe-toolbar_button');

        for (var i = 0; i < el.length; i++) {
            el[i].style.display = 'none';
        }
        document.getElementById('pe-doneBttn').style.display = 'inline-block';
        document.getElementById('pe-cancelBttn').style.display = 'inline-block';
    },

    /**
     * hide edit icon and show toolbar
     *
     */
    closeEditToolBar: function() {
        var el = document.getElementsByClassName('pe-toolbar_button');

        for (var i = 0; i < el.length; i++) {
            el[i].style.display = 'inline-block';
        }

        var el1 = document.getElementsByTagName('figure');

        for (var i = 0; i < el1.length; i++) {
            el1[i].style.display = 'none';
        }

        document.getElementById('pe-doneBttn').style.display = 'none';
        document.getElementById('pe-cancelBttn').style.display = 'none';
        document.getElementById('pe-widthInput').style.display = 'none';
        document.getElementById('pe-heightInput').style.display = 'none';
        document.getElementById('pe-slideBar').style.display = 'none';
        document.getElementById('pe-vertical').style.display = 'none';
        document.getElementById('pe-horizontal').style.display = 'none';
        document.getElementById('pe-rotateLeft').style.display = 'none';
        document.getElementById('pe-rotateRight').style.display = 'none';
    },

    /**
     * redraw canvas when click cancel edit button
     *
     */
    cancelEditImage: function() {
        var pos = this.stack_position;
        var image = this.img_arr[pos];
        document.getElementById("pe-panel").remove();
        var data = "<canvas id='pe-panel'></canvas>";
        document.getElementById('pe-container').innerHTML += data;
        var tempCtx = document.getElementById('pe-panel').getContext('2d');
        tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);

        tempCtx.canvas.width = image.width;
        tempCtx.canvas.height = image.height;

        this.stack_position = pos;
        tempCtx.drawImage(image.img, 0, 0, image.width, image.height);
        if(this.zoomValue != 0) {
            this.zoom(this.zoomValue);
        }

        var el = document.getElementsByClassName('pe-toolbar_button');

        for (var i = 0; i < el.length; i++) {
            el[i].style.display = 'inline-block';
        }

        var el1 = document.getElementsByTagName('figure');

        for (var i = 0; i < el1.length; i++) {
            el1[i].style.display = 'none';
        }

        document.getElementById('pe-doneBttn').style.display = 'none';
        document.getElementById('pe-cancelBttn').style.display = 'none';
        document.getElementById('pe-widthInput').style.display = 'none';
        document.getElementById('pe-heightInput').style.display = 'none';
        document.getElementById('pe-slideBar').style.display = 'none';
        document.getElementById('pe-vertical').style.display = 'none';
        document.getElementById('pe-horizontal').style.display = 'none';
        document.getElementById('pe-rotateLeft').style.display = 'none';
        document.getElementById('pe-rotateRight').style.display = 'none';
    },

    /**
     * Handle choosing filter event
     *
     */
    chooseFilter: function() {
        this.openEditToolBar();
        var tempCtx = document.getElementById('pe-panel').getContext('2d');
        var el = document.getElementsByClassName('pe-img');
        var src = tempCtx.canvas.toDataURL();

        imageData = tempCtx.canvas.toDataURL();
        for (var i = 0; i < el.length; i++) {
            el[i].src = imageData;
            el[i].parentElement.style.display = 'inline-block';
        }

        document.getElementById('pe-filterArea').style.display = '';
        document.getElementById("pe-toaster").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName':'pe-toaster'});
        document.getElementById("pe-aden").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-aden'});
        document.getElementById("pe-amaro").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-amaro'});
        document.getElementById("pe-brooklyn").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-brooklyn'});
        document.getElementById("pe-clarendon").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-clarendon'});
        document.getElementById("pe-inkwell").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-inkwell'});
        document.getElementById("pe-lofi").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-lofi'});
        document.getElementById("pe-stinson").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-stinson'});
        document.getElementById("pe-walden").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-walden'});
        document.getElementById("pe-xpro2").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-xpro2'});
        document.getElementById("pe-brannan").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-brannan'});
        document.getElementById("pe-maven").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'pe-maven'});
        document.getElementById("pe-doneBttn").onclick = this.apply.bind(this);
    },

    /**
     * get location of mouse when start draw crop box
     *
     */
    dragStart: function(e) {
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        if (e.target === this.dragItem) {
            this.active = true;
        }
    },

    /**
     * get location of mouse after draw crop box
     *
     */
    dragEnd: function(e) {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
    },

    /**
     * get location when mouse moving and set transform for dragItem
     *
     */
    drag: function(e) {
        if (this.active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            this.setTranslate(this.currentX, this.currentY, document.getElementById("pe-panel"));
        }
    },

    setTranslate: function(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    },

    /**
     * Initlize mousedown and mouseup event
     *
     */
    initEventsOnCanvas: function() {
        this.ctx.canvas.onmousedown = this.onMouseDown.bind(this);
        this.ctx.canvas.onmouseup = this.onMouseUp.bind(this);
        this.ctx.canvas.ontouchstart = this.onMouseDown.bind(this);
        this.ctx.canvas.ontouchend = this.onMouseUp.bind(this);
    },

    onMouseDown: function(e) {
        var loc;
        if (e.type === "touchstart") {
            loc = this.windowToCanvas(e.touches[0].clientX, e.touches[0].clientY);
        } else {
            loc = this.windowToCanvas(e.clientX, e.clientY);
        }

        e.preventDefault();
        this.click = true;
        if (!this.resize) {
            this.ctx.canvas.onmousemove = this.onMouseMove.bind(this);
            this.ctx.canvas.ontouchmove = this.onMouseMove.bind(this);
            this.downPointX = loc.x;
            this.downPointY = loc.y;
            this.lastPointX = loc.x;
            this.lastPointY = loc.y;
        }
    },

    onMouseMove: function(e) {
        e.preventDefault();
        var loc;
        if (this.click) {
            if (e.type === "touchmove") {
                loc = this.windowToCanvas(e.touches[0].clientX, e.touches[0].clientY);
            } else {
                loc = this.windowToCanvas(e.clientX, e.clientY);
            }

            this.lastPointX = loc.x;
            this.lastPointY = loc.y;
            this.reDrawCanvas();
        }
    },

    onMouseUp: function(e) {
        e.preventDefault();
        if (e.type === "touchend") {
            this.ctx.canvas.ontouchmove = this.onImageResize.bind(this);
        } else {
            this.ctx.canvas.onmousemove = this.onImageResize.bind(this);
        }
        this.click = false;
    },

    /**
     * redraw canvas
     *
     */
    reDrawCanvas: function() {
        this.clearCanvas();
        this.drawImage();
        this.drawSelRect();
        this.drawResizerBox();
    },

    clearCanvas: function() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = this.canvasBackgroundColor;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },

    /**
     * Draw image on canvas.
     */
    drawImage: function() {
        this.ctx.drawImage(this.image, 0, 0);
    },

    /**
     * Draw selection box on canvas
     */
    drawSelRect: function() {
        this.ctx.strokeStyle = '#000000';
        this.ctx.setLineDash([5]);
        this.ctx.strokeRect(this.downPointX, this.downPointY, (this.lastPointX - this.downPointX), (this.lastPointY - this.downPointY));
    },

    /**
     * resize the selection box.
     * it works when click == true and hover on resize box == true
     *
     * @param  e
     * @return {[type]}
     */
    onImageResize: function(e) {
        var loc = this.windowToCanvas(e.clientX, e.clientY);
        this.ctx.fillStyle = '#FF0000';
        this.ctx.lineWidth = 1;
        if (this.isResizeBoxHover(loc, this.downPointX, this.downPointY)) {
            if (this.click) {
                this.downPointX = loc.x
                this.downPointY = loc.y;
                this.reDrawCanvas();
            }
        } else if (this.isResizeBoxHover(loc, this.lastPointX, this.downPointY)) {
            if (this.click) {
                this.lastPointX = loc.x;
                this.downPointY = loc.y
                this.reDrawCanvas();
            }
        } else if (this.isResizeBoxHover(loc, this.lastPointX, this.lastPointY)) {
            if (this.click) {
                this.lastPointY = loc.y;
                this.lastPointX = loc.x
                this.reDrawCanvas();
            }
        } else if (this.isResizeBoxHover(loc, this.downPointX, this.lastPointY)) {
            if (this.click) {
                this.downPointX = loc.x;
                this.lastPointY = loc.y
                this.reDrawCanvas();
            }
        } else {
            this.resize = false;
            this.reDrawCanvas();
        }
    },

    /**
     * Detect the mousehover on given axis
     */
    isResizeBoxHover: function(loc, xPoint, yPoint) {
        var hoverMargin = 3;
        if (loc.x > (xPoint - this.hoverBoxSize - hoverMargin) && loc.x < (xPoint + this.hoverBoxSize + hoverMargin) && loc.y > (yPoint - this.hoverBoxSize - hoverMargin) && loc.y < (yPoint + 5 + hoverMargin)) {
            this.ctx.fillRect(xPoint - this.hoverBoxSize, yPoint - this.hoverBoxSize, this.hoverBoxSize * 2, this.hoverBoxSize * 2);
            this.resize = true;
            return true;
        }
        return false;
    },

    /**
     * Draw 4 resize box of 10 x 10
     */
    drawResizerBox: function() {
        this.ctx.fillStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(this.downPointX - this.hoverBoxSize , this.downPointY - this.hoverBoxSize, this.hoverBoxSize * 2, this.hoverBoxSize * 2);
        this.ctx.fillRect(this.lastPointX - this.hoverBoxSize, this.downPointY - this.hoverBoxSize, this.hoverBoxSize * 2, this.hoverBoxSize * 2);
        this.ctx.fillRect(this.lastPointX - this.hoverBoxSize, this.lastPointY - this.hoverBoxSize, this.hoverBoxSize * 2, this.hoverBoxSize * 2);
        this.ctx.fillRect(this.downPointX - this.hoverBoxSize, this.lastPointY - this.hoverBoxSize, this.hoverBoxSize * 2, this.hoverBoxSize * 2);

    },

    /**
     * Translate to HTML coardinates to Canvas coardinates.
     */
    windowToCanvas: function(x, y) {
        var canvas = this.ctx.canvas,
            bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    },

    /**
     * Get the canavs, remove cutout, create image elemnet on UI.
     * @return {[type]}
     */
    cropImage: function() {
        document.getElementById("pe-panel").remove();
        var data = "<canvas id='pe-panel'></canvas>";
        document.getElementById('pe-container').innerHTML += data;
        var tempCtx = document.getElementById('pe-panel').getContext('2d');
        tempCtx.clearRect(0, 0, tempCtx.canvas.style.width, tempCtx.canvas.style.height);
        tempCtx.canvas.width = this.lastPointX - this.downPointX;
        tempCtx.canvas.height = this.lastPointY - this.downPointY;
        tempCtx.drawImage(this.image, this.downPointX, this.downPointY, (this.lastPointX - this.downPointX), (this.lastPointY - this.downPointY), 0, 0, (this.lastPointX - this.downPointX), (this.lastPointY - this.downPointY));

        imageData = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();
        var width = document.getElementById('pe-panel').width;
        var height = document.getElementById('pe-panel').height;
        var image = new Image();
        image.src = imageData;

        var tmp = {
            img: image,
            width: width,
            height: height
        }
        this.img_arr.push(tmp);
        this.stack_position++;
        this.closeEditToolBar();
    },

    /**
     * open resize tool bar and change value of width or height when use type number
     *
     */
    changeImageSize: function() {
        this.openEditToolBar();
        document.getElementById('pe-resizeBttn').style.display = 'inline-block';
        document.getElementById('pe-widthInput').style.display = 'inline-block';
        document.getElementById('pe-heightInput').style.display = 'inline-block';

        var tmp = document.getElementById('pe-panel').getContext('2d');

        document.getElementById('pe-widthValue').value = tmp.canvas.width;
        document.getElementById('pe-heightValue').value = tmp.canvas.height;

        document.getElementById('pe-widthValue').addEventListener('keyup', function () {
            var ratio = this.value/tmp.canvas.width;
            document.getElementById('pe-heightValue').value = Math.round(tmp.canvas.height * ratio);
        });

        document.getElementById('pe-heightValue').addEventListener('keyup', function () {
            var ratio = this.value/tmp.canvas.height;
            document.getElementById('pe-widthValue').value = Math.round(tmp.canvas.width * ratio);
        });

        document.getElementById("pe-doneBttn").onclick = this.resizeImage.bind(this, {'resizeStatus' : true});

    },

    resizeImage : function (param) {
        var tmpCanvas = document.getElementById('pe-panel');
        var newCanvas = "<canvas id='pe-panel'></canvas>";
        var width;
        var height;
        var image;
        var tmp = this;

        //resize image value
        if (typeof(param.resizeStatus) !== 'undefined' ) {
            width = document.getElementById('pe-widthValue').value;
            height = document.getElementById('pe-heightValue').value;
        } else {
            width = tmpCanvas.width;
            height = tmpCanvas.height;
        }

        image = new Image();
        image.src = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();
        tmpCanvas.remove();
        document.getElementById('pe-container').innerHTML += newCanvas;

        var tempCtx = document.getElementById('pe-panel').getContext('2d');
        tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);
        tempCtx.canvas.width = width;
        tempCtx.canvas.height = height;

        image.onload = function() {
            //redraw image on canvas
            tempCtx.drawImage(image, 0, 0, width, height);

            //add image to img_arr (for undo/redo)
            var newImg = new Image();
            newImg.src = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();
            var imgValue = {
                img: newImg,
                width: width,
                height: height
            }
            tmp.img_arr.push(imgValue);
            tmp.stack_position++;
        }

        this.closeEditToolBar();
    },

    /**
     * open blur/brighness/contrast/grayscale/saturate tool bar and change value filter when use move rangeBar
     *
     */
    changeImageFilter: function(name) {
        this.openEditToolBar();
        var tmp = this;
        document.getElementById('pe-slideBar').style.display = 'inline-block';
        if (name == 'blur') {
            document.getElementById('pe-rangeBar').value = 0;
        } else {
            document.getElementById('pe-rangeBar').value = 100;
        }

        document.getElementById(name).style.display = 'inline-block';

        var tempCtx = document.getElementById('pe-panel').getContext('2d');
        var src = tempCtx.canvas.toDataURL();

        var slider = document.getElementById("pe-rangeBar");
        var output = document.getElementById("pe-filterValue");
        output.innerHTML = slider.value;

        slider.oninput = function() {
            output.innerHTML = this.value;
            tmp.applyFilter({'filterStatus' : 'true', 'property' : name.substring(3), 'src' : src });

        }
        document.getElementById("pe-doneBttn").onclick = this.apply.bind(this);
    },

    /**
     * open orientage bar
     * orientage Image: horizontal/vertical/rotateLeft/rotateRight
     */
    orientateImage: function() {
        this.openEditToolBar();
        document.getElementById('pe-orientateBttn').style.display = 'inline-block';
        document.getElementById('pe-vertical').style.display = 'inline-block';
        document.getElementById('pe-horizontal').style.display = 'inline-block';
        document.getElementById('pe-rotateLeft').style.display = 'inline-block';
        document.getElementById('pe-rotateRight').style.display = 'inline-block';

        document.getElementById('pe-vertical').addEventListener('click', function() {
            var width = document.getElementById('pe-panel').width;
            var height = document.getElementById('pe-panel').height;
            imageData = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();

            var tempCtx = document.getElementById('pe-panel').getContext('2d');
            tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);
            tempCtx.canvas.width = width;
            tempCtx.canvas.height = height;
            tempCtx.translate(tempCtx.canvas.width, 0);
            tempCtx.scale(-1, 1);

            var image = new Image();
            image.src = imageData;
            image.onload = function() {
                tempCtx.drawImage(image, 0, 0, width, height);
            };
            tempCtx.restore();
        });

        document.getElementById('pe-horizontal').addEventListener('click', function() {
            var width = document.getElementById('pe-panel').width;
            var height = document.getElementById('pe-panel').height;
            imageData = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();

            var tempCtx = document.getElementById('pe-panel').getContext('2d');
            tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);
            tempCtx.canvas.width = width;
            tempCtx.canvas.height = height;
            tempCtx.translate(0, tempCtx.canvas.height);
            tempCtx.scale(1, -1);

            var image = new Image();
            image.src = imageData;
            image.onload = function() {
                tempCtx.drawImage(image, 0, 0, width, height);
            };
            tempCtx.restore();
        });

        document.getElementById('pe-rotateRight').addEventListener('click', function() {
            var width = document.getElementById('pe-panel').width;
            var height = document.getElementById('pe-panel').height;

            imageData = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();
            var tempCtx = document.getElementById('pe-panel').getContext('2d');
            var blank = document.createElement('canvas');

            //blank canvas
            blank.width = tempCtx.canvas.width;
            blank.height = tempCtx.canvas.height;
            // check if canvas is blank
            if (imageData != blank.toDataURL()) {
                tempCtx.canvas.width = height;
                tempCtx.canvas.height = width;

                tempCtx.clearRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);
                tempCtx.translate(height, 0);
                tempCtx.rotate(90 * Math.PI / 180);

                var image = new Image();
                image.src = imageData;
                image.onload = function() {
                    tempCtx.drawImage(image, 0, 0);
                    var zoomW = document.getElementById('pe-panel').style.width;
                    var zommH = document.getElementById('pe-panel').style.height
                    document.getElementById('pe-panel').style.width = zommH;
                    document.getElementById('pe-panel').style.height = zoomW;
                };
                tempCtx.restore();
            }

        });

        document.getElementById('pe-rotateLeft').addEventListener('click', function() {
            var width = document.getElementById('pe-panel').width;
            var height = document.getElementById('pe-panel').height;

            imageData = document.getElementById('pe-panel').getContext('2d').canvas.toDataURL();
            var tempCtx = document.getElementById('pe-panel').getContext('2d');

            //blank canvas
            var blank = document.createElement('canvas');
            blank.width = tempCtx.canvas.width;
            blank.height = tempCtx.canvas.height;
            // check if canvas is blank
            if (imageData != blank.toDataURL()) {

                tempCtx.canvas.width = height;
                tempCtx.canvas.height = width;
                tempCtx.clearRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);
                tempCtx.translate(0, width);
                tempCtx.rotate(270 * Math.PI / 180);

                var image = new Image();
                image.src = imageData;
                image.onload = function() {
                    tempCtx.drawImage(image, 0, 0);
                    var zoomW = document.getElementById('pe-panel').style.width;
                    var zommH = document.getElementById('pe-panel').style.height
                    document.getElementById('pe-panel').style.width = zommH;
                    document.getElementById('pe-panel').style.height = zoomW;
                };
                tempCtx.restore();
            }
        });

        document.getElementById("pe-doneBttn").onclick = this.apply.bind(this);
    },

    /**
     * zoom image (zoom in/zoom out) with ratio
     *
     * @param ratio
     */
    zoom: function(val) {
        img_ele = document.getElementById('pe-panel');
        width = this.img_arr[this.stack_position].width;

        img_ele.style.left = '';
        img_ele.style.top = '';
        var pre_width = img_ele.getBoundingClientRect().width, pre_height = img_ele.getBoundingClientRect().height;
        img_ele.style.width = (pre_width * val) + 'px';
        img_ele.style.height = (pre_height * val) + 'px';
        this.zoomValue = (pre_width * val) / width;
        img_ele = null;
    },

    /**
     * redraw image in previous status
     *
     */
    undo: function() {
        var pos = this.stack_position;

        if (pos > 0 ) {
            var image = this.img_arr[pos-1];
            document.getElementById("pe-panel").remove();
            var data = "<canvas id='pe-panel'></canvas>";
            document.getElementById('pe-container').innerHTML += data;
            var tempCtx = document.getElementById('pe-panel').getContext('2d');
            tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);

            tempCtx.canvas.width = image.width;
            tempCtx.canvas.height = image.height;

            this.stack_position = pos - 1;
            tempCtx.drawImage(image.img, 0, 0, image.width, image.height);
            if(this.zoomValue != 0) {
                this.zoom(this.zoomValue);
            }
        }
    },

    /**
     * redraw image in behind status
     *
     */
    redo: function() {
        var pos = this.stack_position;

        if (pos + 1 < this.img_arr.length) {
            var image = this.img_arr[pos+1];
            document.getElementById("pe-panel").remove();
            var data = "<canvas id='pe-panel'></canvas>";
            document.getElementById('pe-container').innerHTML += data;
            var tempCtx = document.getElementById('pe-panel').getContext('2d');
            tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);

            tempCtx.canvas.width = image.width;
            tempCtx.canvas.height = image.height;

            this.stack_position = pos + 1;
            tempCtx.drawImage(image.img, 0, 0, image.width, image.height);
            if(this.zoomValue != 0) {
                this.zoom(this.zoomValue);
            }
        }
    },

    /**
     * add filter to image on canvas
     *
     */
    applyFilter : function(param) {
        var canvas = document.createElement('canvas');
        var actx = canvas.getContext("2d");

        canvas.width = document.getElementById('pe-panel').width;
        canvas.height = document.getElementById('pe-panel').height;

        var image = new Image();
        if(param.src == '') {
            image.src = document.getElementById('pe-panel').toDataURL();
        } else {
            image.src = param.src;
        }

        //filter value
        if (typeof(param.filterStatus) !== 'undefined') {
            var val = document.getElementById("pe-filterValue").innerHTML;
            if (param.property == 'blur') {
                actx.filter =  param.property+'('+val+'px)';
            } else {
                actx.filter =  param.property+'('+val+'%)';
            }
        }

        //filter sample value
        if(typeof(param.filterSample) !== 'undefined') {
            actx.filter = this.filter[param.filterName];
        }

        image.onload = function() {
            actx.drawImage(image, 0, 0, canvas.width, canvas.height);

            var imageData = actx.getImageData(0, 0, actx.canvas.width, actx.canvas.height);
            var tempCtx = document.getElementById('pe-panel').getContext('2d');

            document.getElementById('pe-panel').setAttribute('width', canvas.width);
            document.getElementById('pe-panel').setAttribute('height', canvas.height);

            tempCtx.putImageData(imageData, 0, 0);
        }
    },

    /**
     * close edit toolbar and add image to img_arr (for undo/redo)
     *
     */
    apply : function () {

        var tempCtx = document.getElementById('pe-panel').getContext('2d');
        //add image to img_arr (for undo/redo)
        var newImg = new Image();
        newImg.src = tempCtx.canvas.toDataURL();

        var imgValue = {
            img: newImg,
            width: tempCtx.canvas.width,
            height: tempCtx.canvas.height
        }

        this.img_arr.push(imgValue);
        this.stack_position++;
        this.closeEditToolBar();
    },

     /**
     * render to HTML IMG Tag
     *
     */
    render : function (src_img, place_render) {
        var myImage = document.createElement("IMG");
        document.getElementsByClassName('pe-main')[0].style.display = 'none';
        myImage.setAttribute('src', src_img);
        myImage.setAttribute("id", "imgRender");
        document.getElementById(place_render).innerHTML = '';
        document.getElementById(place_render).appendChild(myImage);
        document.getElementById(place_render).addEventListener('click', function(){
           document.getElementById('imgRender').style.display = 'none';
           document.getElementsByClassName('pe-main')[0].style.display = 'block';
        });
    }
};