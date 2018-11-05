var photoEditor = {
    element: '<div class="main"><div class="table img-edit" ><div class="tableCell box" id="container"><canvas id="panel"></canvas><label id="uploadImg" class="label" style="text-align: center"><p style="color:white; font-size: 36px;">Click to upload image</p><input type="file" class="sr-only" id="input" name="image" accept="image/*"></label></div></div><div class="table"><div class="toolbar" id="anh"><div class="toolbar_button" id="dragBttn" name="Drag"><span class="fa fa-arrows tooltip"></span><span class="tooltiptext">Drag</span></div><div class="toolbar_button" id="resizeBttn" name="Resize"><span class="fa fa-expand tooltip"></span><span class="tooltiptext">Resize</span></div><div class="sizearea" id="widthInput" style="display: none;"><span>Width</span><input type="text" id="widthValue" style="width: 30px"></div><div class="sizearea" id="heightInput" style="display: none;"><span>Height</span><input type="text" id="heightValue" style="width: 30px"></div><div class="toolbar_button" id="cropBttn" name="Crop"><span class="fa fa-crop tooltip"></span><span class="tooltiptext">Crop</span></div><div class="toolbar_button" id="zoominBttn" name="ZoomIn"><span class="fa fa-search-minus tooltip"></span><span class="tooltiptext">ZoomIn</span></div><div class="toolbar_button" id="zoomoutBttn" name="Zoomout"><span class="fa fa-search-plus tooltip"></span><span class="tooltiptext">ZoomOut</span></div><div class="toolbar_button" id="orientateBttn" name="Zoomout"><span class="fa fa-refresh tooltip"></span><span class="tooltiptext">Orientation</span></div><div class="toolbar_button" id="rotateLeft" style="display: none" name="Rotate Counterclockwise"><span class="fa fa-rotate-left tooltip"></span><span class="tooltiptext" style="width:200px;">Rotate Counterclockwise</span></div><div class="toolbar_button" id="rotateRight" style="display: none" name="Rotate Clockwise"><span class="fa fa-rotate-right tooltip"></span><span class="tooltiptext">Rotate Clockwise</span></div><div class="toolbar_button" id="vertical" style="display: none"><span class="fa fa-arrows-h tooltip"></span><span class="tooltiptext">Vertical</span></div><div class="toolbar_button" id="horizontal" style="display: none"><span class="fa fa-arrows-v tooltip"></span><span class="tooltiptext">Horizontal</span></div><div class="toolbar_button" id="contrast" name="Contrast"><span class="fa fa-adjust tooltip"></span><span class="tooltiptext">Contrast</span></div><div class="toolbar_button" id="brightness" name="Brightness"><span class="fa fa-sun-o tooltip"></span><span class="tooltiptext">Brighness</span></div><div class="toolbar_button" id="blur" name="Blur"><span class="fa fa-filter tooltip"></span><span class="tooltiptext">Blur</span></div><div class="toolbar_button" id="grayscale" name="Grayscale"><span class="fa fa-snowflake-o tooltip"></span><span class="tooltiptext">Grayscale</span></div><div class="toolbar_button" id="saturate" name="Saturate"><span class="fa fa-diamond tooltip"></span><span class="tooltiptext">Saturate</span></div><div class="toolbar_button" id="filter" name="Saturate"><span class="fa fa-cogs tooltip"><span class="tooltiptext">Filter</span></span></div><div class="toolbar_button" id="undoBttn" name="Undo"><span class="fa fa-mail-reply tooltip"></span><span class="tooltiptext">Undo</span></div><div class="toolbar_button " id="redoBttn" name="Redo"><span class="fa fa-mail-forward tooltip"></span><span class="tooltiptext">Redo</span></div><div class="slidecontainer sizearea" style="display: none" id="slideBar"><input type="range" min="0" max="200" value="100" class="slider" id="rangeBar"><span id="filterValue">Value: </span></div><div id="filterArea" style="display: none"><figure class="brannan tooltip"><img id="brannan" class="img"><span class="tooltiptext">brannan</span></figure><figure class="aden tooltip"><img id="aden" class="img"><span class="tooltiptext">Aden</span></figure><figure class="clarendon tooltip"><img id="clarendon" class="img"><span class="tooltiptext">Clarendon</span></figure><figure class="lofi tooltip" id="style1"><img id="lofi" class="img"><span class="tooltiptext"> Lofi</span></figure><figure class="amaro tooltip"><img id="amaro" class="img"><span class="tooltiptext">Amaro</span></figure><figure class="walden tooltip"><img id="walden" class="img"><span class="tooltiptext">Walden</span></figure><figure class="maven tooltip"><img id="maven" class="img"><span class="tooltiptext">Maven</span></figure><figure class="brooklyn tooltip"><img id="brooklyn" class="img"><span class="tooltiptext">Brooklyn</span></figure><figure class="xpro2 tooltip"><img id="xpro2" class="img"><span class="tooltiptext">Xpro2</span></figure><figure class="toaster tooltip"><img id="toaster" class="img"><span class="tooltiptext">Toaster</span></figure><figure class="stinson tooltip"><img id="stinson" class="img"><span class="tooltiptext">Stinson</span></figure><figure class="inkwell tooltip"><img id="inkwell" class="img"><span class="tooltiptext">Inkwell</span></figure></div><button class="toolbar_button" id="doneBttn" name="Apply" style="display:none;"><span class="fa fa-check"></span></button><button class="toolbar_button" id="cancelBttn" name="Cancel" style="display: none;"><span class="fa fa-close"></span></button></div></div></div>',
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

    /**
     * Initlize canvas and handle button event
     *
     */
    init: function(param) {
        document.getElementById(param).insertAdjacentHTML("afterend", this.element);
        document.getElementById(param).remove();

        var tmp = this;
        var el = document.getElementsByClassName('toolbar_button');
        this.img_arr = [];
        this.stack_position = 0;
        this.zoomValue = 0;

        for (var i = 0; i < el.length; i++) {
            el[i].style.pointerEvents = 'none';
        }

        this.dragItem = document.getElementById("panel");
        this.container = document.getElementById("container");
        this.ctx = document.getElementById("panel").getContext("2d");
        this.initCanvas();

        //value of filter
        this.filter = {
            'toaster' : 'contrast(150%) brightness(90%)',
            'amaro' : 'contrast(90%) brightness(110%) saturate(150%) hue-rotate(-10deg)',
            'brooklyn' : 'contrast(90%) brightness(110%)',
            'clarendon' : 'contrast(120%) saturate(125%)',
            'inkwell' : 'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)',
            'aden' : 'contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg)',
            'stinson' : 'contrast(75%) brightness(115%) saturate(85%)',
            'walden' : 'brightness(110%) saturate(160%) sepia(30%) hue-rotate(350deg)',
            'xpro2' : 'sepia(30%)',
            'maven' : 'contrast(95%) brightness(95%) saturate(150%) sepia(25%)',
            'brannan' : 'contrast(140%) sepia(50%)',
            'lofi' : 'contrast(150%) saturate(110%)'
        };

        //buttons event
        document.getElementById("resizeBttn").onclick = this.changeImageSize.bind(this);
        document.getElementById("contrast").onclick = this.changeImageFilter.bind(this, 'contrast');
        document.getElementById("brightness").onclick = this.changeImageFilter.bind(this, 'brightness');
        document.getElementById("grayscale").onclick = this.changeImageFilter.bind(this, 'grayscale');
        document.getElementById("blur").onclick = this.changeImageFilter.bind(this, 'blur');
        document.getElementById("saturate").onclick = this.changeImageFilter.bind(this, 'saturate');
        document.getElementById("cancelBttn").onclick = this.cancelEditImage.bind(this);
        document.getElementById("orientateBttn").onclick = this.orientateImage.bind(this);
        document.getElementById('zoominBttn').onclick = this.zoom.bind(this, 0.5);
        document.getElementById('zoomoutBttn').onclick = this.zoom.bind(this, 1.5);
        document.getElementById('undoBttn').onclick = this.undo.bind(this);
        document.getElementById('redoBttn').onclick = this.redo.bind(this);

        document.getElementById('dragBttn').onclick = function(e) {
            tmp.ctx = document.getElementById("panel").getContext("2d");
            tmp.image.src = tmp.ctx.canvas.toDataURL();

            var container = document.querySelector("#container");
            //mouse's mobile event
            container.addEventListener("touchstart", tmp.dragStart.bind(tmp), false);
            container.addEventListener("touchend", tmp.dragEnd.bind(tmp), false);
            container.addEventListener("touchmove", tmp.drag.bind(tmp), false);
            //mouse's mobile pc
            container.addEventListener("mousedown", tmp.dragStart.bind(tmp), false);
            container.addEventListener("mouseup", tmp.dragEnd.bind(tmp), false);
            container.addEventListener("mousemove", tmp.drag.bind(tmp), false);
        };

        document.getElementById("filter").onclick = this.chooseFilter.bind(this);

        document.getElementById("cropBttn").addEventListener('click', function() {
            tmp.ctx = document.getElementById("panel").getContext("2d");
            tmp.image.src = tmp.ctx.canvas.toDataURL();

            tmp.openEditToolBar();

            document.getElementById('cropBttn').style.display = 'inline-block';

            tmp.initEventsOnCanvas();
            document.getElementById("doneBttn").onclick = tmp.cropImage.bind(tmp);

            //remove drag event
            var container = document.querySelector("#container");
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

    initCanvas: function() {
        this.image = new Image();
        this.image.setAttribute('crossOrigin', 'anonymous'); //optional,  it is needed only if your image is not avalible on same domain.

        var tmp = this;

        document.getElementById('input').addEventListener('change', function (e) {
            var el = document.getElementsByClassName('toolbar_button');
            for (var i = 0; i < el.length; i++) {
                el[i].style.pointerEvents = '';
            }

            var files = e.target.files;

            if (files && files.length > 0) {
                var reader = new FileReader();

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

            document.getElementById('uploadImg').style.display = 'none';

            var tempCtx = document.getElementById('panel').getContext('2d');
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
        var el = document.getElementsByClassName('toolbar_button');

        for (var i = 0; i < el.length; i++) {
            el[i].style.display = 'none';
        }
        document.getElementById('doneBttn').style.display = 'inline-block';
        document.getElementById('cancelBttn').style.display = 'inline-block';
    },

    /**
     * hide edit icon and show toolbar
     *
     */
    closeEditToolBar: function() {
        var el = document.getElementsByClassName('toolbar_button');

        for (var i = 0; i < el.length; i++) {
            el[i].style.display = 'inline-block';
        }

        var el1 = document.getElementsByTagName('figure');

        for (var i = 0; i < el1.length; i++) {
            el1[i].style.display = 'none';
        }

        document.getElementById('doneBttn').style.display = 'none';
        document.getElementById('cancelBttn').style.display = 'none';
        document.getElementById('widthInput').style.display = 'none';
        document.getElementById('heightInput').style.display = 'none';
        document.getElementById('slideBar').style.display = 'none';
        document.getElementById('vertical').style.display = 'none';
        document.getElementById('horizontal').style.display = 'none';
        document.getElementById('rotateLeft').style.display = 'none';
        document.getElementById('rotateRight').style.display = 'none';
    },

    /**
     * redraw canvas when click cancel edit button
     *
     */
    cancelEditImage: function() {
        var pos = this.stack_position;
        var image = this.img_arr[pos];
        document.getElementById("panel").remove();
        var data = "<canvas id='panel'></canvas>";
        document.getElementById('container').innerHTML += data;
        var tempCtx = document.getElementById('panel').getContext('2d');
        tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);

        tempCtx.canvas.width = image.width;
        tempCtx.canvas.height = image.height;

        this.stack_position = pos;
        tempCtx.drawImage(image.img, 0, 0, image.width, image.height);
        if(this.zoomValue != 0) {
            this.zoom(this.zoomValue);
        }

        var el = document.getElementsByClassName('toolbar_button');

        for (var i = 0; i < el.length; i++) {
            el[i].style.display = 'inline-block';
        }

        var el1 = document.getElementsByTagName('figure');

        for (var i = 0; i < el1.length; i++) {
            el1[i].style.display = 'none';
        }

        document.getElementById('doneBttn').style.display = 'none';
        document.getElementById('cancelBttn').style.display = 'none';
        document.getElementById('widthInput').style.display = 'none';
        document.getElementById('heightInput').style.display = 'none';
        document.getElementById('slideBar').style.display = 'none';
        document.getElementById('vertical').style.display = 'none';
        document.getElementById('horizontal').style.display = 'none';
        document.getElementById('rotateLeft').style.display = 'none';
        document.getElementById('rotateRight').style.display = 'none';
    },

    /**
     * Handle choosing filter event
     *
     */
    chooseFilter: function() {
        this.openEditToolBar();
        var tempCtx = document.getElementById('panel').getContext('2d');
        var el = document.getElementsByClassName('img');
        var src = tempCtx.canvas.toDataURL();

        imageData = tempCtx.canvas.toDataURL();
        for (var i = 0; i < el.length; i++) {
            el[i].src = imageData;
            el[i].parentElement.style.display = 'inline-block';
        }

        document.getElementById('filterArea').style.display = '';
        document.getElementById("toaster").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName':'toaster'});
        document.getElementById("aden").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'aden'});
        document.getElementById("amaro").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'amaro'});
        document.getElementById("brooklyn").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'brooklyn'});
        document.getElementById("clarendon").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'clarendon'});
        document.getElementById("inkwell").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'inkwell'});
        document.getElementById("lofi").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'lofi'});
        document.getElementById("stinson").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'stinson'});
        document.getElementById("walden").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'walden'});
        document.getElementById("xpro2").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'xpro2'});
        document.getElementById("brannan").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'brannan'});
        document.getElementById("maven").onclick = this.applyFilter.bind(this, {'filterSample' : true, 'src' : src, 'filterName': 'maven'});
        document.getElementById("doneBttn").onclick = this.apply.bind(this);
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
            this.setTranslate(this.currentX, this.currentY, document.getElementById("panel"));
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
        document.getElementById("panel").remove();
        var data = "<canvas id='panel'></canvas>";
        document.getElementById('container').innerHTML += data;
        var tempCtx = document.getElementById('panel').getContext('2d');
        tempCtx.clearRect(0, 0, tempCtx.canvas.style.width, tempCtx.canvas.style.height);
        tempCtx.canvas.width = this.lastPointX - this.downPointX;
        tempCtx.canvas.height = this.lastPointY - this.downPointY;
        tempCtx.drawImage(this.image, this.downPointX, this.downPointY, (this.lastPointX - this.downPointX), (this.lastPointY - this.downPointY), 0, 0, (this.lastPointX - this.downPointX), (this.lastPointY - this.downPointY));

        imageData = document.getElementById('panel').getContext('2d').canvas.toDataURL();
        var width = document.getElementById('panel').width;
        var height = document.getElementById('panel').height;
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
        document.getElementById('resizeBttn').style.display = 'inline-block';
        document.getElementById('widthInput').style.display = 'inline-block';
        document.getElementById('heightInput').style.display = 'inline-block';

        var tmp = document.getElementById('panel').getContext('2d');

        document.getElementById('widthValue').value = tmp.canvas.width;
        document.getElementById('heightValue').value = tmp.canvas.height;

        document.getElementById('widthValue').addEventListener('keyup', function () {
            var ratio = this.value/tmp.canvas.width;
            document.getElementById('heightValue').value = Math.round(tmp.canvas.height * ratio);
        });

        document.getElementById('heightValue').addEventListener('keyup', function () {
            var ratio = this.value/tmp.canvas.height;
            document.getElementById('widthValue').value = Math.round(tmp.canvas.width * ratio);
        });

        document.getElementById("doneBttn").onclick = this.resizeImage.bind(this, {'resizeStatus' : true});

    },

    resizeImage : function (param) {
        var tmpCanvas = document.getElementById('panel');
        var newCanvas = "<canvas id='panel'></canvas>";
        var width;
        var height;
        var image;
        var tmp = this;

        //resize image value
        if (typeof(param.resizeStatus) !== 'undefined' ) {
            width = document.getElementById('widthValue').value;
            height = document.getElementById('heightValue').value;
        } else {
            width = tmpCanvas.width;
            height = tmpCanvas.height;
        }

        image = new Image();
        image.src = document.getElementById('panel').getContext('2d').canvas.toDataURL();
        tmpCanvas.remove();
        document.getElementById('container').innerHTML += newCanvas;

        var tempCtx = document.getElementById('panel').getContext('2d');
        tempCtx.clearRect(0, 0, tempCtx.width, tempCtx.height);
        tempCtx.canvas.width = width;
        tempCtx.canvas.height = height;

        image.onload = function() {
            //redraw image on canvas
            tempCtx.drawImage(image, 0, 0, width, height);

            //add image to img_arr (for undo/redo)
            var newImg = new Image();
            newImg.src = document.getElementById('panel').getContext('2d').canvas.toDataURL();
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
        document.getElementById('slideBar').style.display = 'inline-block';
        if (name == 'blur') {
            document.getElementById('rangeBar').value = 0;
        } else {
            document.getElementById('rangeBar').value = 100;
        }

        document.getElementById(name).style.display = 'inline-block';

        var tempCtx = document.getElementById('panel').getContext('2d');
        var src = tempCtx.canvas.toDataURL();

        var slider = document.getElementById("rangeBar");
        var output = document.getElementById("filterValue");
        output.innerHTML = slider.value;

        slider.oninput = function() {
            output.innerHTML = this.value;
            tmp.applyFilter({'filterStatus' : 'true', 'property' : name, 'src' : src });

        }
        document.getElementById("doneBttn").onclick = this.apply.bind(this);
    },

    /**
     * open orientage bar
     * orientage Image: horizontal/vertical/rotateLeft/rotateRight
     */
    orientateImage: function() {
        this.openEditToolBar();
        document.getElementById('orientateBttn').style.display = 'inline-block';
        document.getElementById('vertical').style.display = 'inline-block';
        document.getElementById('horizontal').style.display = 'inline-block';
        document.getElementById('rotateLeft').style.display = 'inline-block';
        document.getElementById('rotateRight').style.display = 'inline-block';

        document.getElementById('vertical').addEventListener('click', function() {
            var width = document.getElementById('panel').width;
            var height = document.getElementById('panel').height;
            imageData = document.getElementById('panel').getContext('2d').canvas.toDataURL();

            var tempCtx = document.getElementById('panel').getContext('2d');
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

        document.getElementById('horizontal').addEventListener('click', function() {
            var width = document.getElementById('panel').width;
            var height = document.getElementById('panel').height;
            imageData = document.getElementById('panel').getContext('2d').canvas.toDataURL();

            var tempCtx = document.getElementById('panel').getContext('2d');
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

        document.getElementById('rotateRight').addEventListener('click', function() {
            var width = document.getElementById('panel').width;
            var height = document.getElementById('panel').height;

            imageData = document.getElementById('panel').getContext('2d').canvas.toDataURL();
            var tempCtx = document.getElementById('panel').getContext('2d');
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
                    var zoomW = document.getElementById('panel').style.width;
                    var zommH = document.getElementById('panel').style.height
                    document.getElementById('panel').style.width = zommH;
                    document.getElementById('panel').style.height = zoomW;
                };
                tempCtx.restore();
            }

        });

        document.getElementById('rotateLeft').addEventListener('click', function() {
            var width = document.getElementById('panel').width;
            var height = document.getElementById('panel').height;

            imageData = document.getElementById('panel').getContext('2d').canvas.toDataURL();
            var tempCtx = document.getElementById('panel').getContext('2d');

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
                    var zoomW = document.getElementById('panel').style.width;
                    var zommH = document.getElementById('panel').style.height
                    document.getElementById('panel').style.width = zommH;
                    document.getElementById('panel').style.height = zoomW;
                };
                tempCtx.restore();
            }
        });

        document.getElementById("doneBttn").onclick = this.apply.bind(this);
    },

    /**
     * zoom image (zoom in/zoom out) with ratio
     *
     * @param ratio
     */
    zoom: function(val) {
        img_ele = document.getElementById('panel');
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
            document.getElementById("panel").remove();
            var data = "<canvas id='panel'></canvas>";
            document.getElementById('container').innerHTML += data;
            var tempCtx = document.getElementById('panel').getContext('2d');
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
            document.getElementById("panel").remove();
            var data = "<canvas id='panel'></canvas>";
            document.getElementById('container').innerHTML += data;
            var tempCtx = document.getElementById('panel').getContext('2d');
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

        canvas.width = document.getElementById('panel').width;
        canvas.height = document.getElementById('panel').height;

        var image = new Image();
        if(param.src == '') {
            image.src = document.getElementById('panel').toDataURL();
        } else {
            image.src = param.src;
        }

        //filter value
        if (typeof(param.filterStatus) !== 'undefined') {
            var val = document.getElementById("filterValue").innerHTML;
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
            var tempCtx = document.getElementById('panel').getContext('2d');

            document.getElementById('panel').setAttribute('width', canvas.width);
            document.getElementById('panel').setAttribute('height', canvas.height);

            tempCtx.putImageData(imageData, 0, 0);
        }
    },

    /**
     * close edit toolbar and add image to img_arr (for undo/redo)
     *
     */
    apply : function () {

        var tempCtx = document.getElementById('panel').getContext('2d');
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
    }
};
