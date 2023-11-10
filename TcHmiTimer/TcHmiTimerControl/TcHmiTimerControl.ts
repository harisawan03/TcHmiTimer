/*
 * Generated 6/2/2023 9:10:00 AM
 * Copyright (C) 2023
 */
module TcHmi {
    export module Controls {
        export module TcHmiTimer {
            export class TcHmiTimerControl extends TcHmi.Controls.System.TcHmiControl {
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
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                    this.__onUserInteractionFinishedHourDestroyEvent = null;
                    this.__onUserInteractionFinishedMinuteDestroyEvent = null;
                    this.__onUserInteractionFinishedSecondDestroyEvent = null;
                    this.__onClickStartDestroyEvent = null;
                    this.__onClickResetDestroyEvent = null;
                    this.__onAttachedDestroyEvent = null;
                    this.__onDetachedDestroyEvent = null;
                }

                private __onClickStartDestroyEvent: any;
                private __onClickResetDestroyEvent: any;
                private __onUserInteractionFinishedHourDestroyEvent: any;
                private __onUserInteractionFinishedMinuteDestroyEvent: any;
                private __onUserInteractionFinishedSecondDestroyEvent: any;
                private __onAttachedDestroyEvent: any;
                private __onDetachedDestroyEvent: any;
                private __isTimerInitialized: Boolean;
                private __timeSet: number;

                protected __elementTemplateRootTimer!: JQuery;
                protected __time: string;
                protected __start: Boolean | undefined;
                protected __reset: Boolean | undefined;
                protected __countdown: number | undefined;
                protected __futureTime: number;
                protected __timerInit: Boolean;
                protected __timerBackground!: JQuery;

                protected __progressCircle!: JQuery;
                protected __progressAnimation: TcHmi.Animation;

                /** Control lifecycle */

				/**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  */
                public __previnit() {
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
                public __init() {
                    super.__init();

                    this.__timerBackground = this.__elementTemplateRootTimer.find('#Background');
                    this.__progressCircle = this.__elementTemplateRootTimer.find('#Progress');

                    this.__progressAnimation = new TcHmi.Animation(this.__id, '#Progress');

                    // start timer when Start is true on init - ie the Start property
                    const isStarted = localStorage.getItem(this.__id + '_is-started');
                    if (isStarted === 'true') {
                        this.setStart(true);
                    } else {
                        this.setStart(false);
                    }                    

                    if (this.getStart()) {
                        const storedTime = localStorage.getItem(this.__id + '_time');
                        let remainingTime = this.__getRemainingTime(parseInt(storedTime!));
                        const convertedTime = this.__millisecondsToTimespan(remainingTime);
                        this.setTime(convertedTime);
                        this.__setStart();

                        let storedSetTime = localStorage.getItem(this.__id + '_set-time');
                        if (storedSetTime) {
                            this.__timeSet = parseInt(storedSetTime);
                        }
                        this.__startProgressCircle(remainingTime, this.__timeSet);
                    }

                    localStorage.removeItem(this.__id + '_is-started');
                    localStorage.removeItem(this.__id + '_time');
                    localStorage.removeItem(this.__id + '_set-time');

                    this.__isTimerInitialized = true;
                }

                /**
                * Is called by the system after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __attach() {
                    super.__attach();

                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */

                    this.__onUserInteractionFinishedHourDestroyEvent = TcHmi.EventProvider.register(this.__id + '_hourInput.onUserInteractionFinished', this.__onUserInteractionFinished());
                    this.__onUserInteractionFinishedMinuteDestroyEvent = TcHmi.EventProvider.register(this.__id + '_minuteInput.onUserInteractionFinished', this.__onUserInteractionFinished());
                    this.__onUserInteractionFinishedSecondDestroyEvent = TcHmi.EventProvider.register(this.__id + '_secondInput.onUserInteractionFinished', this.__onUserInteractionFinished());
                    this.__onClickStartDestroyEvent = TcHmi.EventProvider.register(this.__id + '_startBtn.onPressed', this.__onClickStart());
                    this.__onClickResetDestroyEvent = TcHmi.EventProvider.register(this.__id + '_resetBtn.onPressed', this.__onClickReset());
                    this.__onAttachedDestroyEvent = TcHmi.EventProvider.register(this.__id + '.onAttached', this.__onAttached());
                    this.__onDetachedDestroyEvent = TcHmi.EventProvider.register(this.__id + '.onDetached', this.__onDetached());

                    // raise onTimerStart event when Start is true on init - ie the Start property
                    if (this.getStart()) {
                        TcHmi.EventProvider.raise(this.__id + '.onTimerStart');
                    }

                }

                /**
                * Is called by the system after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __detach() {
                    super.__detach();

                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */
                    this.__onUserInteractionFinishedHourDestroyEvent = null;
                    this.__onUserInteractionFinishedMinuteDestroyEvent = null;
                    this.__onUserInteractionFinishedSecondDestroyEvent = null;
                    this.__onClickStartDestroyEvent = null;
                    this.__onClickResetDestroyEvent = null;
                    this.__onAttachedDestroyEvent = null;
                    this.__onDetachedDestroyEvent = null;

                }

                /**
                * Destroy the current control instance. 
                * Will be called automatically if system destroys control!
                */
                public destroy() {
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

                private __onUserInteractionFinished():any {
                    return (evt: any) => {
                        this.__readTime();
                    }
                }

                private __onClickStart(): any {
                    return (evt: any) => {
                        this.__timeSet = this.__getTotalTime(); //MAKE SURE THIS IS THE RIGHT PLACE FOR THIS CALL
                        this.__setStart();
                    }
                };

                private __onClickReset(): any {
                    return (evt: any) => {
                        this.setStart(false);
                    }
                };

                private __onAttached(): any {
                    return (evt: any) => {
                        
                    }
                };

                private __onDetached(): any {
                    return (evt: any) => {
                        
                    }
                };

                // convert milliseconds back to PT timespan format
                protected __millisecondsToTimespan(milliseconds: number) {
                    // Ensure input is a positive number
                    if (milliseconds < 0) {
                        milliseconds = 0;
                    }

                    // Calculate duration components
                    const seconds = Math.floor(milliseconds / 1000) % 60;
                    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
                    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;

                    // Format the duration
                    const formattedDuration = `PT${hours ? hours + 'H' : ''}${minutes ? minutes + 'M' : ''}${seconds ? seconds + 'S' : ''}`;

                    return formattedDuration;
                }

                // reads time from inputs and updates this.__time
                protected __readTime() {
                    const timerObj = this.__getTimerObject();
                    const timerStr = this.__timerObjectToIso(timerObj);
                    this.setTime(timerStr);
                }

                // writes time from display to inputs
                protected __writeTime() {

                    let timeNums = [0, 0, 0];
                    let timeComponents = this.__convertTime(this.getTime()).split(':');
                    timeComponents.forEach((component, index) => {
                        timeNums[index] = parseInt(component);

                    });
                    let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput") as unknown;
                    if (hourInputBase !== undefined) {
                        const hourInput: any = hourInputBase;
                        hourInput.setValue(timeNums[0]);
                    }
                    let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput") as unknown;
                    if (minuteInputBase !== undefined) {
                        const minuteInput: any = minuteInputBase;
                        minuteInput.setValue(timeNums[1]);
                    }
                    let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput") as unknown;
                    if (secondInputBase !== undefined) {
                        const secondInput: any = secondInputBase;
                        secondInput.setValue(timeNums[2]);
                    }

                }

                /** Set Timer */

                protected __getTimerObject() {
                    let timerObject = {
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    }
                    let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput") as unknown;
                    if (hourInputBase !== undefined) {
                        const hourInput: any = hourInputBase;
                        timerObject.hours = hourInput.getValue();
                    }
                    let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput") as unknown;
                    if (minuteInputBase !== undefined) {
                        const minuteInput: any = minuteInputBase;
                        timerObject.minutes = minuteInput.getValue();
                    }
                    let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput") as unknown;
                    if (secondInputBase !== undefined) {
                        const secondInput: any = secondInputBase;
                        timerObject.seconds = secondInput.getValue();
                    }

                    return timerObject;
                }

                protected __timerObjectToIso(timerObject: {
                    hours: number;
                    minutes: number;
                    seconds: number;
                }): string {

                    if (timerObject.hours === 0 && timerObject.minutes === 0 && timerObject.seconds === 0) {
                        return "PT0S";
                    }

                    let isoString = "PT";
                    if (timerObject.hours > 0 && (isoString += timerObject.hours + "H"),
                        timerObject.minutes > 0 && (isoString += timerObject.minutes + "M"),
                        timerObject.seconds > 0) {
                        isoString += (timerObject.seconds) + "S"
                    }

                    return isoString

                }

                /**
                 * 
                 * @param hours
                 * @param minutes
                 * @param seconds
                 * @returns {string}
                 */
                protected __formatTime(hours: number, minutes: number, seconds: number): string {
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
                protected __convertTime(timeString: string | undefined): string {

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

                    let convertedTime = this.__formatTime(hours, minutes, seconds);

                    return convertedTime;

                }

                /**
                 * 
                 * @param milliseconds
                 * @returns {string}
                 */
                protected __convertMilliseconds(milliseconds: number): string {

                    // Calculate the hours, minutes, and seconds
                    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
                    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

                    let convertedMs = this.__formatTime(hours, minutes, seconds);

                    return convertedMs;

                }

                // get time in HH:MM:SS string format
                protected __getFormattedTime(): string {

                    const timerObj = this.__getTimerObject();
                    const timerStr = this.__timerObjectToIso(timerObj);
                    const formattedTime = this.__convertTime(timerStr);

                    return formattedTime;

                }

                // split formatted time into an array of its individual components
                protected __getTimeComponents(): any[] {

                    const formattedTime = this.__getFormattedTime();
                    const timeComponents = formattedTime.split(':');

                    return timeComponents;

                }

                // get the date at the set time in the future for a reference point
                protected __getFutureDate(): Date {

                    const timeComponents = this.__getTimeComponents();

                    const hours = timeComponents[0];
                    const minutes = timeComponents[1];
                    const seconds = timeComponents[2];

                    // so the countdown always works
                    let tempDate = new Date();
                    let tempYear = tempDate.getFullYear();
                    let tempMonth = tempDate.getMonth();
                    let tempDay = tempDate.getDate();
                    let tempHour = tempDate.getHours();
                    let tempMinutes = tempDate.getMinutes();
                    let tempSeconds = tempDate.getSeconds();

                    const futureDate = new Date(
                        tempYear,
                        tempMonth,
                        tempDay,
                        tempHour + parseInt(hours),
                        tempMinutes + parseInt(minutes),
                        tempSeconds + parseInt(seconds)
                    );

                    return futureDate;

                }

                protected __getTotalTime(): number {

                    const currentTime = new Date().getTime();
                    const futureDate = this.__getFutureDate();
                    const totalTime = futureDate.getTime() - currentTime;
                    const roundedTotal = this.__roundToSecond(totalTime);
                    
                    return roundedTotal;

                }

                protected __roundToSecond(time: number) {

                    const seconds = time / 1000;
                    const round = Math.ceil(seconds);
                    const roundedMilliseconds = round * 1000;

                    return roundedMilliseconds;

                }

                protected __getRemainingTime(futureTime: number): number {

                    const currentTime = new Date().getTime();
                    const remainingTime = futureTime - currentTime;
                    const remainingTimeRounded = this.__roundToSecond(remainingTime);

                    return remainingTimeRounded;

                }

                // get the updated time to display on the timer
                protected __updateTime(): string {

                    if (this.__timerInit) { 
                        const futureDate = this.__getFutureDate();
                        this.__futureTime = futureDate.getTime();
                        this.__timerInit = false;
                    }

                    if (this.__futureTime !== undefined) {
                        let remainingTime = this.__getRemainingTime(this.__futureTime);

                        localStorage.setItem(this.__id + '_time', '' + this.__futureTime + '');

                        localStorage.setItem(this.__id + '_is-started', '' + this.getStart() + '');

                        const animationState = this.__progressCircle.css('stroke-dasharray');
                        const thisControl = document.getElementById(this.__id);
                        
                        if (thisControl) {
                            //localStorage.setItem(this.__id + '_animation-progress', animationState);
                            localStorage.setItem(this.__id + '_set-time', '' + this.__timeSet + '');
                        }

                        if (remainingTime < 1000) {
                            clearInterval(this.__countdown);
                            this.__countdown = undefined;
                            remainingTime = 0;
                            this.__timerBackground.addClass('TimesUp');
                            TcHmi.EventProvider.raise(this.__id + '.onTimeUp');
                        }

                        return this.__convertMilliseconds(remainingTime);
                    } else {
                        const formattedTime = this.__getFormattedTime();
                        return formattedTime;
                    }

                }

                /**
                 * 
                 * @param timeNew
                 * @returns {void}
                 */
                public setTime(timeNew: string | null): void {

                    // convert the value with the value converter
                    let convertedTime = TcHmi.ValueConverter.toString(timeNew);

                    // check if the converted value is valid
                    if (convertedTime === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedTime = this.getAttributeDefaultValueInternal('Time') as string;
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
                public getTime() : string | undefined {
                    return this.__time;
                }

                protected __processTime() {
                    this.__writeTime();
                    this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__convertTime(this.__time);
                }


                /** Start Timer */

                private __setStart(): void {
                    localStorage.removeItem(this.__id + '_is-started');
                    localStorage.removeItem(this.__id + '_time');
                    clearInterval(this.__countdown);
                    this.__countdown = undefined;
                    this.setStart(true);
                    this.setReset(false);
                    this.setTime(this.__time);
                    TcHmi.EventProvider.raise(this.__id + '.onTimerStart');
                }

                /**
                 * @description Setter function for 'data-tchmi-start' attribute.
                 * @param startNew the new value or null 
                 */
                public setStart(startNew: boolean | null): void {

                    this.__writeTime();

                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toBoolean(startNew);

                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Start') as boolean;
                    }

                    if (tchmi_equal(convertedValue, this.__start) && this.__isTimerInitialized) {
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
                public getStart() {
                    return this.__start;
                }

                /**
                 * @description Processor function for 'data-tchmi-start' attribute.
                 */
                protected __processStart() {

                    // account for timer reset on PLC
                    if (!this.getStart() && this.__isTimerInitialized) {
                        this.__setReset();
                        this.__writeTime();
                    }

                    if (this.getStart()) {
                        let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput") as unknown;
                        if (hourInputBase !== undefined) {
                            const hourInput: any = hourInputBase;
                            hourInput.setIsEnabled(false);
                        }
                        let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput") as unknown;
                        if (minuteInputBase !== undefined) {
                            const minuteInput: any = minuteInputBase;
                            minuteInput.setIsEnabled(false);
                        }
                        let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput") as unknown;
                        if (secondInputBase !== undefined) {
                            const secondInput: any = secondInputBase;
                            secondInput.setIsEnabled(false);
                        }
                        let startButtonBase = TcHmi.Controls.get(this.__id + "_startBtn") as unknown;
                        if (startButtonBase !== undefined) {
                            const startButton: any = startButtonBase;
                            startButton.setIsEnabled(false);
                        }
                    }

                    this.__timerInit = true;

                    if (this.__start && this.__elementTemplateRootTimer.find('#Time')[0].innerHTML !== '00:00:00') {

                        if (this.__timerInit) {
                            const futureTime = this.__getFutureDate().getTime();
                            const totalTime = this.__getRemainingTime(futureTime);
                            this.__startProgressCircle(totalTime, this.__timeSet);
                        }

                        this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__updateTime();
                        this.__countdown = setInterval(() => {
                            this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__updateTime();
                        }, 1000);
                    }
                }


                /** Reset Timer */

                private __setReset() {
                    clearInterval(this.__countdown);
                    this.__countdown = undefined;
                    this.setReset(true);
                    this.setStart(false);
                    this.setTime(this.__time);
                    localStorage.removeItem(this.__id + '_is-started');
                    localStorage.removeItem(this.__id + '_time');
                    localStorage.removeItem(this.__id + '_set-time');
                    this.__progressAnimation.reset().skip();
                    this.__startProgressCircle(this.__getRemainingTime(this.__getFutureDate().getTime()), this.__timeSet);
                    TcHmi.EventProvider.raise(this.__id + '.onTimerReset');
                }

                /**
                 * @param resetNew the new value or null 
                 */
                public setReset(resetNew: boolean | null): void {
                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toBoolean(resetNew);

                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Reset') as boolean;
                    }

                    // remember the new value
                    this.__reset = convertedValue;

                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Reset' });

                    // call process function to process the new value
                    this.__processReset();
                }

                public getReset() {
                    return this.__reset;
                }

                protected __processReset() {
                    this.__timerBackground?.removeClass('TimesUp');

                    if (this.getReset()) {
                        let hourInputBase = TcHmi.Controls.get(this.__id + "_hourInput") as unknown;
                        if (hourInputBase !== undefined) {
                            const hourInput: any = hourInputBase;
                            hourInput.setIsEnabled(true);
                        }
                        let minuteInputBase = TcHmi.Controls.get(this.__id + "_minuteInput") as unknown;
                        if (minuteInputBase !== undefined) {
                            const minuteInput: any = minuteInputBase;
                            minuteInput.setIsEnabled(true);
                        }
                        let secondInputBase = TcHmi.Controls.get(this.__id + "_secondInput") as unknown;
                        if (secondInputBase !== undefined) {
                            const secondInput: any = secondInputBase;
                            secondInput.setIsEnabled(true);
                        }
                        let startButtonBase = TcHmi.Controls.get(this.__id + "_startBtn") as unknown;
                        if (startButtonBase !== undefined) {
                            const startButton: any = startButtonBase;
                            startButton.setIsEnabled(true);
                        }
                    }

                    this.__elementTemplateRootTimer.find('#Time')[0].innerHTML = this.__convertTime(this.__time);

                }


                protected __getCircumference() {
                    const radius: number = parseFloat(this.__progressCircle.attr('r')!);
                    const circumference = 2 * Math.PI * radius;

                    return circumference;
                }

                // animation for progress bar visual
                protected __startProgressCircle(duration: number, setTime: number) {

                    //const savedProgress = localStorage.getItem(this.__id + '_animation-progress');

                    this.__progressAnimation.skip();
                    this.__progressAnimation.clearKeyframes();
                    //localStorage.removeItem(this.__id + '_animation-progress');

                    const circumference = this.__getCircumference();

                    let keyframeZero = `${circumference} 0`;
                    let keyframeOne = `0 ${circumference}`;

                    let fill = circumference;
                    let empty = 0;

                    if (setTime !== 0) {
                        fill = circumference * (duration / setTime);
                        empty = circumference * ((setTime - duration) / setTime);
                    } else {
                        fill = circumference;
                        empty = 0;
                    }

                    //this.__progressCircle.css('stroke-dasharray', keyframeZero);

                    //if (this.getStart() && savedProgress) {
                    //    keyframeZero = savedProgress;
                    //    keyframeOne = `0 ${circumference}`;
                    //} else
                    if (this.getStart()) {
                        keyframeZero = `${fill} ${empty}`;
                        keyframeOne = `0 ${circumference}`;
                    } else {
                        keyframeZero = `${circumference} 0`;
                        keyframeOne = `${circumference} 0`;
                    }

                    this.__progressAnimation.addKeyframe('stroke-dasharray', keyframeZero, 0)
                        .addKeyframe('stroke-dasharray', keyframeOne, 1)
                        .duration(duration);
                    this.__progressAnimation.timingFunction('linear');
                    this.__progressAnimation.run();                  

                }

            }
        }
    }
}
/**
* Register Control
*/
TcHmi.Controls.registerEx('TcHmiTimerControl', 'TcHmi.Controls.TcHmiTimer', TcHmi.Controls.TcHmiTimer.TcHmiTimerControl);
