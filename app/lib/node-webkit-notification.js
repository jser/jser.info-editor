/**
 * Created by azu on 2014/10/06.
 * LICENSE : MIT
 */
"use strict";
/**
 *
 * @param appIcon
 * @param title
 * @param description
 * @param soundFile
 * @returns {Notification}
 * @constructor
 */
function NotificationWrapper(appIcon, title, description, soundFile) {

    /**
     * A path to a sound file, like /sounds/notification.wav
     */
    function playSound(soundFile) {
        if (soundFile === undefined) {
            return;
        }
        var audio = document.createElement('audio');
        audio.src = soundFile;
        audio.play();
        audio = undefined;
    }

    /**
     * Show the notification here.
     */
    var notification = new window.Notification(title, {
        body: description || "",
        icon: appIcon
    });

    /**
     * Play the sound.
     */
    playSound(soundFile);

    /**
     * Return notification object to controller so we can bind click events.
     */
    return notification;
}
module.exports = NotificationWrapper;