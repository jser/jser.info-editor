"use strict";
var path = require("path");
var store = require("./models/index-store");
var gitCommit = require("../local/git-commit");
var commitButton = document.getElementById("js-commit-button");

commitButton.addEventListener("click", function () {
    var indexPath = store.currentIndexPath;
    var fileName = path.dirname(indexPath);
    var match = fileName.match(/\/(\d{4})\/(\d{2})$/);
    var fileAttr = {
        year: match[1],
        month: match[2],
        name: path.basename(indexPath)
    };
    var commitMessage = "Update: " + fileAttr.year + "/" + fileAttr.month + "/" + fileAttr.name;
    gitCommit(indexPath, commitMessage)
        .on('end', function () {
            new NotificationWrapper(
                '#',    // image icon path goes here
                "Commit!"
            );
        })
        .on('error', function (error) {
            new NotificationWrapper(
                '#',    // image icon path goes here
                "Error!",
                error
            );
            console.log(error);
        });
});
/**
 * Use composition to expand capabilities of Notifications feature.
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
        body: description,
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