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
                    this.__timerInit = true;
                }
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiTimer_TcHmiTimerControl-Template');
                    if (this.__elementTemplateRoot.length === 0) {
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
                __formatTime(hours, minutes, seconds) {
                    // Format the hours, minutes, and seconds as 'hh', 'mm', and 'ss'
                    const formattedHours = hours.toString().padStart(2, '0');
                    const formattedMinutes = minutes.toString().padStart(2, '0');
                    const formattedSeconds = seconds.toString().padStart(2, '0');
                    // Return the formatted time string
                    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                }
                __convertTime(timeString) {
                    if (timeString === undefined) {
                        timeString = 'PT0S';
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
                __convertMilliseconds(milliseconds) {
                    // Calculate the hours, minutes, and seconds
                    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
                    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
                    return this.__formatTime(hours, minutes, seconds);
                }
                __updateTime() {
                    const formattedTime = this.__convertTime(this.__time);
                    const timeComponents = formattedTime.split(':');
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
                    const futureDate = new Date(tempYear, tempMonth, tempDay, tempHour + parseInt(hours), tempMinutes + parseInt(minutes), tempSeconds + parseInt(seconds));
                    if (this.__timerInit) {
                        this.__futureTime = futureDate.getTime();
                        this.__timerInit = false;
                    }
                    const currentTime = new Date().getTime();
                    if (this.__futureTime !== undefined) {
                        let remainingTime = this.__futureTime - currentTime;
                        if (remainingTime < 0) {
                            clearInterval(this.__countdown);
                            remainingTime = 0;
                        }
                        return this.__convertMilliseconds(remainingTime);
                    }
                    else {
                        return formattedTime;
                    }
                }
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
                getTime() {
                    return this.__time;
                }
                __processTime() {
                    this.__countdown = setInterval(() => {
                        this.__elementTemplateRoot.find('#Time')[0].innerHTML = this.__updateTime();
                    }, 1000);
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