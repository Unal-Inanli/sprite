function Sprite(spriteImagePath, spriteXCoordinate, spriteYCoordinate, frameWidth, frameHeight, DomElement) {
    
    /**
     * @type {AnimationsObject} animations
     */
    let animations = {}
    let playingAnimations = {}
    let scale = 1
    let scaledWidth = frameWidth * scale;
    let scaledHeight = frameHeight * scale;
    const sceneWrapperElement = document.createElement("div");
    const spriteImage = document.createElement("img");
    spriteImage.src = spriteImagePath;
    spriteImage.style.position = "absolute";
    spriteImage.style.left =spriteXCoordinate * -scaledWidth + "px";
    spriteImage.style.top = spriteYCoordinate * -scaledHeight + "px";
    spriteImage.style.transform = `scale(${scale})`;
    spriteImage.style.transformOrigin = "0 0";

    /**
     * 
     * @param {OptionsObject} options 
     */
    function init(options) {
      
    
        sceneWrapperElement.style.height = scaledHeight + "px";
        sceneWrapperElement.style.width = scaledWidth + "px";
        sceneWrapperElement.style.overflow = "hidden";
        sceneWrapperElement.style.position = "relative";
        
        if (options) {
            if (options.class) sceneWrapperElement.classList.add(options.class);
        }

        sceneWrapperElement.appendChild(spriteImage);
    
        DomElement.appendChild(sceneWrapperElement);
        
    }


    /**
     * 
     * @param {s} name 
     * @param {number} x 
     * @param {number} y 
     * @param {number} frames 
     * @param {FrameDirection} frameDirection 
     */
    function addBoxAnimation(name, x, y, frames, frameDirection) {
        animations[name] = { x, y, frames, frameDirection, custom: false };
    }


    /**
     * 
     * @param {string} name - name of the animation that will be registered 
     * @param {Frames} frames - An array of type AnimationFrameData objects
     */
    function addAnimation(name, frames) {
        animations[name] = { frames, frameAmount: frames.length, custom: true };
    }


    /**
     * @param {string} name 
     * @param {number} fps
     */

    function playAnimation(name, fps) {  
        playCustomAnimation(name, fps);        
    }

    
    /**
     * 
     * @param {string} name 
     */
    function playCustomAnimation(name, fps) {
        const animationToPlay = animations[name];
        let currentFrame = 0;
        let maxFrames = animationToPlay.frameAmount;
        let animationFrameData = animationToPlay.frames;


        playingAnimations[name] = setInterval(() => {
            
            scaledWidth = animationFrameData[currentFrame].width * scale;
            scaledHeight = animationFrameData[currentFrame].height * scale;
            sceneWrapperElement.style.height = scaledHeight + "px";
            sceneWrapperElement.style.width = scaledWidth + "px";
            spriteImage.style.left = -animationFrameData[currentFrame].topLeftX * scale + "px";
            spriteImage.style.top = -animationFrameData[currentFrame].topLeftY * scale + "px";
            
            if (currentFrame === maxFrames - 1) {
                currentFrame = 0;
            } else {
                currentFrame++;
            }

        }, 1000 / fps);
    }

    //Removed For Now
    // /**
    //  *      * @param {string} name 
    //  */
    // function playNormalAnimation(name, fps) {
    //     const animationToPlay = animations[name];
    //     let startingFrameX = animationToPlay.x
    //     let startingFrameY = animationToPlay.x
    //     let currentFrameX = animationToPlay.x
    //     let currentFrameY = animationToPlay.y
         
    //     playingAnimations[name] = setInterval(() => {
    //         spriteImage.style.left = currentFrameX * -scaledWidth + "px";
    //         spriteImage.style.top = currentFrameY * -scaledHeight + "px";

    //         if (animationToPlay.frameDirection === "horizontal") {
    //             if (currentFrameX >= animationToPlay.frameAmount - 1) {
    //                 currentFrameX = startingFrameX;    
    //             }
    //             else {
    //                 currentFrameX++;
    //             }    
    //         } else {
    //             if (currentFrameY >= animationToPlay.frameAmount - 1) {
    //                 currentFrameY = startingFrameY;    
    //             }
    //             else {
    //                 currentFrameY++;
    //             }        
    //         }
            

    //     }, 1000 / fps);
    // }


    /**
     * 
     * @param {string} name 
     */
    function stopAnimation(name) {
        window.clearInterval(playingAnimations[name]);
        playingAnimations[name] = null;
    }


    function setScale(number) {
        scale = number;
        spriteImage.style.transform = `scale(${scale})`;
    }

    return {
        init,
        addBoxAnimation,
        addAnimation,
        playAnimation,
        stopAnimation,
        setScale,
        spriteBox: sceneWrapperElement,
        spriteImage
    };
}