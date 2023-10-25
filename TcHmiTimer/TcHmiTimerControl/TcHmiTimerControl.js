/*
 * Generated 6/2/2023 9:10:00 AM
 * Copyright (C) 2023
 */
var TcHmi;
(function (TcHmi) {
    let Controls;
    (function (Controls) {
        let TcHmiTimer;
        (function (TcHmiTimer) {
            class TcHmiTimerControl extends TcHmi.Controls.System.TcHmiControl {
                /*
                Attribute philosophy
                --------------------
                - Local variables are not set while definition in class, so they have the value 'undefined'.
                - On compile the Framework sets the value from HTML or from theme (possibly 'null') via normal setters.
                - The "changed detection" in the setter will result in processing the value only once while compile.
                - Attention: If we have a Server Binding on an Attribute the setter will be called once with null to initialize and later with the correct value.
                */
                /** Setup */
                /**
                 * Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element, pcElement, attrs) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                    this.__onUserInteractionFinishedHourDestroyEvent = null;
                    this.__onUserInteractionFinishedMinuteDestroyEvent = null;
                    this.__onUserInteractionFinishedSecondDestroyEvent = null;
                    this.__onClickStartDestroyEvent = null;
                    this.__onClickResetDestroyEvent = null;
                }
                /** Control lifecycle */
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRootTimer = this.__element.find('.TcHmi_Controls_TcHmiTimer_TcHmiTimerControl-Template');
                    if (this.__elementTemplateRootTimer.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    // Call __previnit of base class
                    super.__previnit();
                }
                /**
                 * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init() {
                    super.__init();
                    this.__timerBackground = this.__elementTemplateRootTimer.find('#Background');
                    this.__progressCircle = this.__elementTemplateRootTimer.find('#Progress');
                    this.__progressAnimation = new TcHmi.Animation(this.__id, '#Progress');
                }
                /**
                * Is called by the system after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach() {
                    super.__attach();
                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */
                    this.__onUserInteractionFinishedHourDestroyEvent = TcHmi.EventProvider.register(this.__id + '_hourInput.onUserInteractionFinished', this.__onUserInteractionFinished());
                    this.__onUserInteractionFinishedMinuteDestroyEvent = TcHmi.EventProvider.register(this.__id + '_minuteInput.onUserInteractionFinished', this.__onUserInteractionFinished());
                    this.__onUserInteractionFinishedSecondDestroyEvent = TcHmi.EventProvider.register(this.__id + '_secondInput.onUserInteractionFinished', this.__onUserInteractionFinished());
                    this.__onClickStartDestroyEvent = TcHmi.EventProvider.register(this.__id + '_startBtn.onPressed', this.__onClickStart());
                    this.__onClickResetDestroyEvent = TcHmi.EventProvider.register(this.__id + '_resetBtn.onPressed', this.__onClickReset());
                }
                /**
                * Is called by the system after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach() {
                    super.__detach();
                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */
                    null !== this.__onUserInteractionFinishedHourDestroyEvent && (this.__onUserInteractionFinishedHourDestroyEvent(),
                        this.__onUserInteractionFinishedHourDestroyEvent = null),
                        null !== this.__onUserInteractionFinishedMinuteDestroyEvent && (this.__onUserInteractionFinishedMinuteDestroyEvent(),
                            this.__onUserInteractionFinishedMinuteDestroyEvent = null),
                        null !== this.__onUserInteractionFinishedSecondDestroyEvent && (this.__onUserInteractionFinishedSecondDestroyEvent(),
                            this.__onUserInteractionFinishedSecondDestroyEvent = null),
                        null !== this.__onClickStartDestroyEvent && (this.__onClickStartDestroyEvent(),
                            this.__onClickStartDestroyEvent = null),
                        null !== this.__onClickResetDestroyEvent && (this.__onClickResetDestroyEvent(),
                            this.__onClickResetDestroyEvent = null);
                }
                /**
                * Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy() {
                    /**
                    * While __keepAlive is set to true control must not be destroyed.
                    */
                    if (this.__keepAlive) {
                        return;
                    }
                    super.destroy();
                    /**
                    * Free resources like child controls etc.
                    */
                }
                __onUserInteractionFinished() {
                    return (evt) => {
                        this.__readTime();
                    };
                }
                __onClickStart() {
                    return (evt) => {
                        clearInterval(this.__countdown);
                        this.__countdown = undefined;
                        this.setStart(true);
                        this.__setReset(false);
                        this.setTime(this.__time);
                        TcHmi.EventProvider.raise(this.__id + '.onTimerStart');
                    };
                }
                ;
                __onClickReset() {
                    return (evt) => {
                        clearInterval(this.__countdown);
                        this.__countdown = undefined;
                        this.__setReset(true);
                        this.setStart(false);
                        this.setTime(this.__time);
                        this.__progressAnimation.reset().skip();
                        console.log(this.__progressAnimation.state());
                        TcHmi.EventProvider.raise(this.__id + '.onTimerReset');
                    };
                }
                ;
                // reads time from inputs and updates this.__time
                __readTime() {
                    const timerObj = this.__getTimerObject();
                    const timerStr = this.__timerObjectToIso(timerObj);
                    this.setTime(timerStr);
                }
                // writes time from display to inputs
                __writeTime() {
                    let timeNums = [0, 0, 0];
                    let timeComponents = this.__convertTime(this.getTime()).split(':');
                    timeComponents.forEach((component, index) => {
                        timeNums[index] = parseInt(component);
                    });
                    let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput");
                    if (hourInputBase !== undefined) {
                        const hourInput = hourInputBase;
                        hourInput.setValue(timeNums[0]);
                    }
                    let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput");
                    if (minuteInputBase !== undefined) {
                        const minuteInput = minuteInputBase;
                        minuteInput.setValue(timeNums[1]);
                    }
                    let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput");
                    if (secondInputBase !== undefined) {
                        const secondInput = secondInputBase;
                        secondInput.setValue(timeNums[2]);
                    }
                }
                /** Set Timer */
                __getTimerObject() {
                    let timerObject = {
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };
                    let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput");
                    if (hourInputBase !== undefined) {
                        const hourInput = hourInputBase;
                        timerObject.hours = hourInput.getValue();
                    }
                    let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput");
                    if (minuteInputBase !== undefined) {
                        const minuteInput = minuteInputBase;
                        timerObject.minutes = minuteInput.getValue();
                    }
                    let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput");
                    if (secondInputBase !== undefined) {
                        const secondInput = secondInputBase;
                        timerObject.seconds = secondInput.getValue();
                    }
                    return timerObject;
                }
                __timerObjectToIso(timerObject) {
                    if (0 === timerObject.hours && 0 === timerObject.minutes && 0 === timerObject.seconds) {
                        return "PT0S";
                    }
                    let isoString = "PT";
                    if (timerObject.hours > 0 && (isoString += timerObject.hours + "H"),
                        timerObject.minutes > 0 && (isoString += timerObject.minutes + "M"),
                        timerObject.seconds > 0) {
                        isoString += (timerObject.seconds) + "S";
                    }
                    return isoString;
                }
                /**
                 *
                 * @param hours
                 * @param minutes
                 * @param seconds
                 * @returns {string}
                 */
                __formatTime(hours, minutes, seconds) {
                    // Format the hours, minutes, and seconds as 'hh', 'mm', and 'ss'
                    const formattedHours = hours.toString().padStart(2, '0');
                    const formattedMinutes = minutes.toString().padStart(2, '0');
                    const formattedSeconds = seconds.toString().padStart(2, '0');
                    // Return the formatted time string
                    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                }
                /**
                 *
                 * @param timeString
                 * @returns {string}
                 */
                __convertTime(timeString) {
                    if (timeString === undefined) {
                        timeString = 'PT0S';
                    }
                    if (timeString[1] !== 'T') {
                        timeString = 'PT0S';
                        throw new Error('Time from PLC is greater than or equal to 1 Day');
                    }
                    // Remove the 'PT' prefix from the time string
                    timeString = timeString.replace('PT', '');
                    // Initialize variables to store hours, minutes, and seconds
                    let hours = 0;
                    let minutes = 0;
                    let seconds = 0;
                    // Extract the hours, minutes, and seconds from the time string
                    const hIndex = timeString.indexOf('H');
                    const mIndex = timeString.indexOf('M');
                    const sIndex = timeString.indexOf('S');
                    if (hIndex !== -1) {
                        hours = parseInt(timeString.slice(0, hIndex));
                    }
                    if (mIndex !== -1) {
                        minutes = parseInt(timeString.slice(hIndex + 1, mIndex));
                    }
                    if (sIndex !== -1) {
                        seconds = parseInt(timeString.slice(mIndex + 1, sIndex));
                    }
                    return this.__formatTime(hours, minutes, seconds);
                }
                /**
                 *
                 * @param milliseconds
                 * @returns {string}
                 */
                __convertMilliseconds(milliseconds) {
                    // Calculate the hours, minutes, and seconds
                    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
                    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
                    return this.__formatTime(hours, minutes, seconds);
                }
                __updateTime() {
                    const timerObj = this.__getTimerObject();
                    const timerStr = this.__timerObjectToIso(timerObj);
                    const formattedTime = this.__convertTime(timerStr);
                    const timeComponents = formattedTime.split(':');
                    const hours = timeComponents[0];
                    const minutes = timeComponents[1];
                    const seconds = timeComponents[2];
                    const currentTime = new Date().getTime();
                    // so the countdown always works
                    let tempDate = new Date();
                    let tempYear = tempDate.getFullYear();
                    let tempMonth = tempDate.getMonth();
                    let tempDay = tempDate.getDate();
                    let tempHour = tempDate.getHours();
                    let tempMinutes = tempDate.getMinutes();
                    let tempSeconds = tempDate.getSeconds();
                    const futureDate = new Date(tempYear, tempMonth, tempDay, tempHour + parseInt(hours), tempMinutes + parseInt(minutes), tempSeconds + parseInt(seconds));
                    const totalTime = futureDate.getTime() - currentTime;
                    if (this.__timerInit) {
                        this.__futureTime = futureDate.getTime();
                        this.__startProgressCircle(totalTime);
                        this.__timerInit = false;
                    }
                    if (this.__futureTime !== undefined) {
                        let remainingTime = this.__futureTime - currentTime;
                        if (remainingTime <= 0) {
                            clearInterval(this.__countdown);
                            this.__countdown = undefined;
                            remainingTime = 0;
                            this.__timerBackground.addClass('TimesUp');
                            TcHmi.EventProvider.raise(this.__id + '.onTimeUp');
                        }
                        return this.__convertMilliseconds(remainingTime);
                    }
                    else {
                        return formattedTime;
                    }
                }
                /**
                 *
                 * @param timeNew
                 * @returns {void}
                 */
                setTime(timeNew) {
                    // convert the value with the value converter
                    let convertedTime = TcHmi.ValueConverter.toString(timeNew);
                    // check if the converted value is valid
                    if (convertedTime === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedTime = this.getAttributeDefaultValueInternal('Time');
                    }
                    if (tchmi_equal(convertedTime, this.__time)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__time = convertedTime;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Time' });
                    // call process function to process the new value
                    this.__processTime();
                }
                /**
                 *
                 * @returns {string | undefined}
                 */
                getTime() {
                    return this.__time;
                }
                __processTime() {
                    this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__convertTime(this.__time);
                }
                /** Start Timer */
                /**
                 * @description Setter function for 'data-tchmi-start' attribute.
                 * @param startNew the new value or null
                 */
                setStart(startNew) {
                    // accounts for browser refresh
                    this.__writeTime();
                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toBoolean(startNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Start');
                    }
                    if (tchmi_equal(convertedValue, this.__start)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__start = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Start' });
                    // call process function to process the new value
                    this.__processStart();
                }
                /**
                 * @description Getter function for 'data-tchmi-start' attribute.
                 */
                getStart() {
                    return this.__start;
                }
                /**
                 * @description Processor function for 'data-tchmi-start' attribute.
                 */
                __processStart() {
                    // account for timer reset on PLC
                    if (!this.getStart()) {
                        clearInterval(this.__countdown);
                        this.__setReset(true);
                        this.__writeTime();
                    }
                    if (this.getStart()) {
                        let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput");
                        if (hourInputBase !== undefined) {
                            const hourInput = hourInputBase;
                            hourInput.setIsEnabled(false);
                        }
                        let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput");
                        if (minuteInputBase !== undefined) {
                            const minuteInput = minuteInputBase;
                            minuteInput.setIsEnabled(false);
                        }
                        let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput");
                        if (secondInputBase !== undefined) {
                            const secondInput = secondInputBase;
                            secondInput.setIsEnabled(false);
                        }
                        let startButtonBase = TcHmi.Controls.get(this.__id + "_startBtn");
                        if (startButtonBase !== undefined) {
                            const startButton = startButtonBase;
                            startButton.setIsEnabled(false);
                        }
                    }
                    this.__timerInit = true;
                    if (this.__start && this.__elementTemplateRootTimer.find('#Time')[0].innerHTML !== '00:00:00') {
                        this.__countdown = setInterval(() => {
                            this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__updateTime();
                        }, 1000);
                    }
                }
                /** Reset Timer */
                /**
                 * @param resetNew the new value or null
                 */
                __setReset(resetNew) {
                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toBoolean(resetNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Reset');
                    }
                    // remember the new value
                    this.__reset = convertedValue;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Reset' });
                    // call process function to process the new value
                    this.__processReset();
                }
                __getReset() {
                    return this.__reset;
                }
                __processReset() {
                    this.__timerBackground?.removeClass('TimesUp');
                    if (this.__getReset()) {
                        let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput");
                        if (hourInputBase !== undefined) {
                            const hourInput = hourInputBase;
                            hourInput.setIsEnabled(true);
                        }
                        let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput");
                        if (minuteInputBase !== undefined) {
                            const minuteInput = minuteInputBase;
                            minuteInput.setIsEnabled(true);
                        }
                        let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput");
                        if (secondInputBase !== undefined) {
                            const secondInput = secondInputBase;
                            secondInput.setIsEnabled(true);
                        }
                        let startButtonBase = TcHmi.Controls.get(this.__id + "_startBtn");
                        if (startButtonBase !== undefined) {
                            const startButton = startButtonBase;
                            startButton.setIsEnabled(true);
                        }
                    }
                    this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__convertTime(this.__time);
                }
                __startProgressCircle(duration) {
                    const radius = parseFloat(this.__progressCircle.attr('r'));
                    const circumference = 2 * Math.PI * radius;
                    const strokeOffset = (1 / 4) * circumference;
                    this.__progressCircle.attr('stroke-dashoffset', strokeOffset);
                    // initial stroke-dasharray = circumference 0
                    // final stroke-dasharray = 0 circumference
                    this.__progressAnimation.addKeyframe('stroke-dasharray', `${circumference} 0`, 0)
                        .addKeyframe('stroke-dasharray', `${circumference / 2} ${circumference / 2}`, 0.5)
                        .addKeyframe('stroke-dasharray', `0 ${circumference}`, 1)
                        .duration(duration);
                    this.__progressAnimation.timingFunction('linear');
                    this.__progressAnimation.run();
                }
            }
            TcHmiTimer.TcHmiTimerControl = TcHmiTimerControl;
        })(TcHmiTimer = Controls.TcHmiTimer || (Controls.TcHmiTimer = {}));
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));
/**
* Register Control
*/
TcHmi.Controls.registerEx('TcHmiTimerControl', 'TcHmi.Controls.TcHmiTimer', TcHmi.Controls.TcHmiTimer.TcHmiTimerControl);
//# sourceMappingURL=TcHmiTimerControl.js.map