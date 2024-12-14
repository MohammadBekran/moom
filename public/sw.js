self.addEventListener("push", function (event) {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: data.icon,
    badge: "/icons/logo.svg",
    data: data.link,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationClick", (event) => {
  event.notification.close();
  clients.openWindow(event.notification.data);
});
