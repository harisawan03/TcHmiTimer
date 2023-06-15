declare module TcHmi {
    module Controls {
        module TcHmiTimer {
            class TcHmiTimerControl extends TcHmi.Controls.System.TcHmiControl {
                /** Setup */
                /**
                 * Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
                private __onClickStartDestroyEvent;
                private __onClickResetDestroyEvent;
                private __onUserInteractionFinishedHourDestroyEvent;
                private __onUserInteractionFinishedMinuteDestroyEvent;
                private __onUserInteractionFinishedSecondDestroyEvent;
                protected __elementTemplateRootTimer: JQuery;
                protected __time: string;
                protected __start: Boolean | undefined;
                protected __reset: Boolean | undefined;
                protected __countdown: number | undefined;
                protected __futureTime: number;
                protected __timerInit: Boolean;
                protected __startButton: JQuery;
                protected __resetButton: JQuery;
                /** Control lifecycle */
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  */
                __previnit(): void;
                /**
                 * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init(): void;
                /**
                * Is called by the system after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach(): void;
                /**
                * Is called by the system after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach(): void;
                /**
                * Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy(): void;
                private __onUserInteractionFinished;
                private __onClickStart;
                private __onClickReset;
                protected __readTime(): void;
                protected __writeTime(): void;
                /** Set Timer */
                protected __getTimerObject(): {
                    hours: number;
                    minutes: number;
                    seconds: number;
                };
                protected __timerObjectToIso(timerObject: {
                    hours: number;
                    minutes: number;
                    seconds: number;
                }): string;
                /**
                 *
                 * @param hours
                 * @param minutes
                 * @param seconds
                 * @returns {string}
                 */
                protected __formatTime(hours: number, minutes: number, seconds: number): string;
                /**
                 *
                 * @param timeString
                 * @returns {string}
                 */
                protected __convertTime(timeString: string | undefined): string;
                /**
                 *
                 * @param milliseconds
                 * @returns {string}
                 */
                protected __convertMilliseconds(milliseconds: number): string;
                protected __updateTime(): string;
                /**
                 *
                 * @param timeNew
                 * @returns {void}
                 */
                setTime(timeNew: string | null): void;
                /**
                 *
                 * @returns {string | undefined}
                 */
                getTime(): string | undefined;
                protected __processTime(): void;
                /** Start Timer */
                /**
                 * @description Setter function for 'data-tchmi-start' attribute.
                 * @param startNew the new value or null
                 */
                setStart(startNew: boolean | null): void;
                /**
                 * @description Getter function for 'data-tchmi-start' attribute.
                 */
                getStart(): Boolean | undefined;
                /**
                 * @description Processor function for 'data-tchmi-start' attribute.
                 */
                protected __processStart(): void;
                /** Reset Timer */
                /**
                 * @param resetNew the new value or null
                 */
                protected __setReset(resetNew: boolean | null): void;
                protected __getReset(): Boolean | undefined;
                protected __processReset(): void;
            }
        }
    }
}
