// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.42/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiTimer;
        (function (TcHmiTimer) {
            function ConvertTime(timeString) {

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

                // Format the hours, minutes, and seconds as 'hh', 'mm', and 'ss'
                const formattedHours = hours.toString().padStart(2, '0');
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');

                // Return the formatted time string
                return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

            }
            TcHmiTimer.ConvertTime = ConvertTime;
        })(TcHmiTimer = Functions.TcHmiTimer || (Functions.TcHmiTimer = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('ConvertTime', 'TcHmi.Functions.TcHmiTimer', TcHmi.Functions.TcHmiTimer.ConvertTime);
