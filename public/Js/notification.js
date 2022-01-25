function displayNotification() {
  if (Notification.permission == 'granted') {
    console.log("Not");
    navigator.serviceWorker.getRegistration().then((reg) => {
      console.log("isReg");
      const options = {
        body: 'Lets take a break',
        vibrate: [99, 50, 100],
        icon: '../icon-193x192.png',

        data: {
          dateOfArrival: Date.now(),
          primaryKey: 0,
        },
        actions: [{
            action: 'explore',
            title: 'Explore this new world',
            icon: '../icon-193x192.png',
          },
          {
            action: 'close',
            title: 'Close notification',
            icon: '../icon-193x192.png',
          },
        ],
      };
      reg.showNotification('PomodoroApp!', options);
    });
  }
}

displayNotification();

Notification.requestPermission((status) => {
  // displayNotification();
});
export {
  displayNotification
};