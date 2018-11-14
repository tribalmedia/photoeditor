# Photoeditor

A simple and easy-to-use library which provides the completion of the most basic editing functions.

## Features
* Support both PC and mobile devices
* Upload Image
* Apply Filter Effect on image such as brightness, contrast, blur, gray, staturate 
* Apply Filter Sample on image with twelve samples
* Orientate Image with horizontal, vertical, rotate clockwise, rotate counterclockwise
* Support resize image
* Support crop image
* Undo and Redo 
* Apply or Cancel editing 

## Build with
* Font Awesome 4.7.0

To install Font Awesome library run below commandline:
```
npm install
```

## Installation
Two ways to intall library: 
* Clone library and put it into your project 

```
git clone https://github.com/tribalmedia/photoeditor.git
```

* Or download directly library from github and put it into your project

Then import ```photoeditor.js``` and ```photoeditor.css``` into somewhere you want to use.

## Usage
Simply apply Photoeditor with a reference to the element:
```
<div id="test"></div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        photoEditor.init('test');
    }, false);
</script>

```

## Authors

`<code>` with ❤ by Tribal Media House


## License

Photoeditor is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


