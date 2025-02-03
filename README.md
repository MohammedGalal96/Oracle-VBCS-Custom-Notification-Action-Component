# Oracle VBCS Custom Notification Action Component

The **Custom Notification** action component is designed to display customizable notifications with a variety of options for appearance, position, and behavior. It’s perfect for alerting users with dynamic content in a clean and styled way.

## Installation

If you prefer to skip the setup steps and immediately test the pre-configured app with the custom notification action already set up, simply download the Custom_Notification_App.zip and import it into VBCS.

Otherwise, follow the steps below to set up the Custom Notification action component in your VBCS project:

#### 1\. Download the custom_notification.zip file.

#### 2\. Right-click on "actions" then choose "Import" and select the custom_notification.zip file.

![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/1.png)

#### 3\. In the Navigator, go to the Web Apps tab, select the web app, then go to the JSON tab to open the app-flow.json file. Next, specify the path to the custom action’s code file by adding a requirejs property in the app-flow.
```
  "requirejs": {
    "paths": {
      "custom_notification/notification": "resources/actions/custom_notification/notification/action"
    }
  }
```
  

**Note:** If the requirejs property exists, only add the following path:
```
    "custom_notification/notification": "resources/actions/custom_notification/notification/action"
```
  

![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/2.png)

#### 4\. Once done, it will appear in the action palette inside the action chains.

![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/3.png)

## Notification Options

| Property | Type | Description | Example | Required | Default Value |
| --- | --- | --- | --- | --- | --- |
| **summary** | String | The title of the notification. | "Successfully uploaded!" | Yes | N/A |
| **message** | String | The message content of the notification. | "Your settings have been saved." | No | N/A |
| **displayMode** | String | Defines the display mode: transient or persist. | "transient", "persist" | No  | `transient` |
| **duration** | String | The duration for transient notifications (in milliseconds). | 5000 | No  | 5000 |
| **backgroundColor** | String | Background color in (HEX or RGB). | `#4CAF50` / `rgb(76, 175, 80)` | No  | N/A |
| **lineColor** | String | The border line color in (HEX or RGB). | `#333333` / `rgb(51, 51, 51)` | No  | N/A |
| **iconColor** | String | The icon color in (HEX or RGB). | "#FFFFFF" / `rgb(255, 255, 255)` | No  | N/A |
| **icon** | String | HTML for the icon to be used in the notification. | `<i class='fa fa-check'></i>` / `<span class="oj-ux-ico-artificial-intelligence2"></span>` | No | N/A |
| **notificationType** | String | The type of notification: info, error, warning, success, custom. | "info", "success", "error", "warning", "custom" | No | "info" |
| **position** | String | The position of the notification on the screen. | "top-left", "top-middle", "top-right", "bottom-left", "bottom-middle", "bottom-right" | No | `top-middle` |
| **theme** | String | The theme of the notification: light or dark. | "light", "dark" | No  | `light` |

## Tips & Notes for Notification Customization

### duration:
- This property only affects **transient** notifications. For **persist** notifications, it will be ignored, as the notification will stay until manually dismissed.

### position:
- On small screens, only **top-middle** or **bottom-middle** positions will be used. Other positions, even if specifically set, will be ignored to maintain a clean layout.

### backgroundColor:
- The **backgroundColor** property is ignored when using the **dark** theme.

### backgroundColor, lineColor, iconColor, icon:
- These properties can be changed for any **notificationType**. However, to keep the code clear and organized, use `notificationType: "custom"` if you need to modify these properties for **error** or **clear** notifications.

### Default Configuration in action.js

- If you want to extend or change specific properties like icons , duration, displayMode, position, or theme for all notifications, you can modify the DEFAULT_CONFIG. The default settings will be ignored only when you set a custom value for those properties.

```
const DEFAULT_CONFIG = {
  theme: 'light',
  position: 'top-middle',
  positionMobile: 'top-middle',
  type: NOTIFICATION_TYPES.INFO,
  displayMode: 'transient',
  duration: 5000
};


const ICONS = {
    [NOTIFICATION_TYPES.INFO]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V14C9 14.5523 9.44772 15 10 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13V10C11 9.44772 10.5523 9 10 9H9Z" fill="currentColor"/></svg>',
    [NOTIFICATION_TYPES.SUCCESS]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill="currentColor"/></svg>',
    [NOTIFICATION_TYPES.WARNING]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.4845 3.49501C9.15808 2.33937 10.842 2.33937 11.5156 3.49501L17.0956 13.268C17.7692 14.4236 16.9272 15.8333 15.5801 15.8333H4.41993C3.07285 15.8333 2.23077 14.4236 2.90436 13.268L8.4845 3.49501ZM10 5.83333C10.4602 5.83333 10.8333 6.20643 10.8333 6.66667V10C10.8333 10.4602 10.4602 10.8333 10 10.8333C9.53976 10.8333 9.16666 10.4602 9.16666 10V6.66667C9.16666 6.20643 9.53976 5.83333 10 5.83333ZM10 13.3333C10.4602 13.3333 10.8333 12.9602 10.8333 12.5C10.8333 12.0398 10.4602 11.6667 10 11.6667C9.53976 11.6667 9.16666 12.0398 9.16666 12.5C9.16666 12.9602 9.53976 13.3333 10 13.3333Z" fill="currentColor"/></svg>',
    [NOTIFICATION_TYPES.ERROR]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z" fill="currentColor"/></svg>'
  };

const CLOSE_ICON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L8 6.29289L3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.29289 7L3.14645 11.1464C2.95118 11.3417 2.95118 11.6583 3.14645 11.8536C3.34171 12.0488 3.65829 12.0488 3.85355 11.8536L8 7.70711L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L8.70711 7L12.8536 2.85355Z" fill="currentColor"/></svg>';


```


## Screenshot Examples

Below are some examples of how the action will appear:

![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/4.png) ![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/5.png) ![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/6.png) ![](https://github.com/MohammedGalal96/Oracle-VBCS-Custom-Notification-Action-Component/blob/main/images/9.png)
