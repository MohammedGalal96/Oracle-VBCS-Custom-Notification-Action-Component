/**
 * Custom Notification Action
 * 
 * This module defines a custom notification action that can be used to display
 * notifications of different types (info, success, warning, error) in various
 * positions on the screen. Notifications can be customized with different themes,
 * icons, colors, and durations.
 * 
 * @module CustomNotificationAction
 * @author Mohammed Galal
 * @see https://www.linkedin.com/in/mogalal/
 */


define(['vb/action/action', 'text!../resources/actions/custom_notification/notification/notification.css'], (Action, css) => {
  'use strict';

  /**
   * Enum for notification types.
   * @readonly
   * @enum {string}
   */
  const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
  };

  /**
   * Array of valid notification positions.
   * @readonly
   * @type {string[]}
   */
  const NOTIFICATION_POSITIONS = [
    'top-left', 'top-middle', 'top-right',
    'bottom-left', 'bottom-middle', 'bottom-right'
  ];

  /**
   * Default configuration for notifications.
   * @readonly
   * @type {Object}
   * @property {string} theme - Default theme ('light' or 'dark').
   * @property {string} position - Default position for desktop.
   * @property {string} positionMobile - Default position for mobile.
   * @property {string} type - Default notification type.
   * @property {string} displayMode - Default display mode ('transient' or 'persist').
   * @property {number} duration - Default duration in milliseconds for transient notifications.
   */
  const DEFAULT_CONFIG = {
    theme: 'light',
    position: 'top-middle',
    positionMobile: 'top-middle',
    type: NOTIFICATION_TYPES.INFO,
    displayMode: 'transient',
    duration: 5000
  };

  /**
   * Icons for each notification type.
   * @readonly
   * @type {Object}
   */
  const ICONS = {
    [NOTIFICATION_TYPES.INFO]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V14C9 14.5523 9.44772 15 10 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13V10C11 9.44772 10.5523 9 10 9H9Z" fill="currentColor"/></svg>',
    [NOTIFICATION_TYPES.SUCCESS]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill="currentColor"/></svg>',
    [NOTIFICATION_TYPES.WARNING]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.4845 3.49501C9.15808 2.33937 10.842 2.33937 11.5156 3.49501L17.0956 13.268C17.7692 14.4236 16.9272 15.8333 15.5801 15.8333H4.41993C3.07285 15.8333 2.23077 14.4236 2.90436 13.268L8.4845 3.49501ZM10 5.83333C10.4602 5.83333 10.8333 6.20643 10.8333 6.66667V10C10.8333 10.4602 10.4602 10.8333 10 10.8333C9.53976 10.8333 9.16666 10.4602 9.16666 10V6.66667C9.16666 6.20643 9.53976 5.83333 10 5.83333ZM10 13.3333C10.4602 13.3333 10.8333 12.9602 10.8333 12.5C10.8333 12.0398 10.4602 11.6667 10 11.6667C9.53976 11.6667 9.16666 12.0398 9.16666 12.5C9.16666 12.9602 9.53976 13.3333 10 13.3333Z" fill="currentColor"/></svg>',
    [NOTIFICATION_TYPES.ERROR]: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z" fill="currentColor"/></svg>'
  };

  /**
   * Close icon for notifications.
   * @readonly
   * @type {string}
   */
  const CLOSE_ICON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L8 6.29289L3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.29289 7L3.14645 11.1464C2.95118 11.3417 2.95118 11.6583 3.14645 11.8536C3.34171 12.0488 3.65829 12.0488 3.85355 11.8536L8 7.70711L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L8.70711 7L12.8536 2.85355Z" fill="currentColor"/></svg>';

  /**
   * CustomAction class for handling notifications.
   * @extends Action
   */
  class CustomAction extends Action {
    /**
     * Creates an instance of CustomAction.
     */
    constructor() {
      super();
      if (!CustomAction.containersCreated) {
        this.injectStyles();
        this.createContainers();
        CustomAction.containersCreated = true;
      }
    }

    /**
     * Injects CSS styles into the document.
     */
    injectStyles() {
      const style = document.createElement('style');
      style.innerHTML = css;
      document.head.appendChild(style);
    }

    /**
     * Creates notification containers for each position.
     */
    createContainers() {
      NOTIFICATION_POSITIONS.forEach(position => {
        const container = document.createElement('div');
        container.id = `mg-notification-${position}`;
        container.className = `mg-notification-container mg-${position}`;
        document.body.appendChild(container);
      });
    }

    /**
     * Performs the notification action.
     * @param {Object} parameters - Parameters for the notification.
     * @param {string} parameters.summary - Notification title.
     * @param {string} parameters.message - Notification message.
     * @param {string} [parameters.theme] - Notification theme ('light' or 'dark').
     * @param {string} [parameters.notificationType] - Notification type (info, success, warning, error).
     * @param {string} [parameters.displayMode] - Display mode ('transient' or 'persist').
     * @param {string} [parameters.position] - Notification position.
     * @param {number} [parameters.duration] - Duration for transient notifications.
     * @param {string} [parameters.backgroundColor] - Background color for the notification.
     * @param {string} [parameters.lineColor] - Line color for the notification.
     * @param {string} [parameters.iconColor] - Icon color for the notification.
     * @param {string} [parameters.icon] - Custom icon for the notification.
     * @returns {Object} - Action outcome.
     */
    perform(parameters) {
      const {
        summary: title,
        message,
        theme,
        notificationType: type,
        displayMode,
        position,
        duration,
        backgroundColor,
        lineColor,
        iconColor,
        icon
      } = parameters;

      this.showNotification({
        title,
        message,
        theme,
        type,
        displayMode,
        position,
        duration,
        backgroundColor,
        lineColor,
        iconColor,
        icon
      });

      return Action.createSuccessOutcome();
    }

    /**
     * Displays a notification.
     * @param {Object} options - Notification options.
     * @param {string} options.title - Notification title.
     * @param {string} options.message - Notification message.
     * @param {string} [options.type] - Notification type.
     * @param {string} [options.theme] - Notification theme.
     * @param {string} [options.displayMode] - Display mode.
     * @param {string} [options.position] - Notification position.
     * @param {number} [options.duration] - Notification duration.
     * @param {string} [options.backgroundColor] - Background color.
     * @param {string} [options.lineColor] - Line color.
     * @param {string} [options.iconColor] - Icon color.
     * @param {string} [options.icon] - Custom icon.
     */
    showNotification(options) {
      const {
        title,
        message,
        type = DEFAULT_CONFIG.type,
        theme = DEFAULT_CONFIG.theme,
        displayMode = DEFAULT_CONFIG.displayMode,
        position,
        duration = displayMode === 'persist' ? null : DEFAULT_CONFIG.duration,
        backgroundColor,
        lineColor,
        iconColor,
        icon
      } = options;
      const container = document.getElementById(`mg-notification-${this.getPosition(options.position)}`);
      const notification = document.createElement('div');

      notification.className = `mg-notification mg-notification-${type}${theme === 'dark' ? ' mg-theme-dark' : ''}`;

      if (backgroundColor && theme != 'dark' ) {
        notification.style.backgroundColor = backgroundColor;
      }

      notification.innerHTML = `
        <div class="mg-notification-icon" ${iconColor ? `style="color: ${iconColor}"` : ''}>
          ${this.getIcon(type,icon)}
        </div>
        <div class="mg-notification-content">
          ${title ? `<div class="mg-notification-title">${title}</div>` : ''}
          ${message ? `<div class="mg-notification-message">${message}</div>` : ''}
        </div>
        <button class="mg-notification-close" onclick="this.closest('.mg-notification').classList.remove('mg-show'); setTimeout(() => this.closest('.mg-notification').remove(), 300);">
          ${CLOSE_ICON}
        </button>
      `;
      
      if (lineColor) {
        notification.id = `mg-notification-${Date.now()}`;
        const style = document.createElement('style');
        style.textContent = `
          #${notification.id}::before {
            background-color: ${lineColor} !important;
          }
        `;
        notification.appendChild(style);
      }

      container.appendChild(notification);
      setTimeout(() => notification.classList.add('mg-show'), 10);

      if (duration) {
        setTimeout(() => {
          notification.classList.remove('mg-show');
          setTimeout(() => notification.remove(), 300);
        }, duration);
      }
    }

    /**
     * Gets the position for the notification based on device type.
     * @param {string} position - Notification position.
     * @returns {string} - Resolved position.
     */
    getPosition(position) {
      return this.isMobile() ? this.getMobilePosition(position) : position || DEFAULT_CONFIG.position;
    }

    /**
     * Checks if the device is mobile.
     * @returns {boolean} - True if the device is mobile, false otherwise.
     */
    isMobile() {
      return window.innerWidth <= 768;
    }

    /**
     * Gets the mobile position for the notification.
     * @param {string} position - Notification position.
     * @returns {string} - Resolved mobile position.
     */
    getMobilePosition(position) {
      if (!position) return DEFAULT_CONFIG.positionMobile;
      if (position.startsWith('top')) return 'top-middle';
      if (position.startsWith('bottom')) return 'bottom-middle';
      return 'top-middle';
    }

    /**
     * Gets the icon for the notification.
     * @param {string} type - Notification type.
     * @param {string} [customIcon] - Custom icon HTML.
     * @returns {string} - Icon HTML.
     */
    getIcon(type, customIcon = null) {
      if (customIcon) {
        return `<span class="mg-icon-container">${customIcon}</span>`;
      }

      const iconHTML = ICONS[type] || ICONS.info;
      return `<span class="mg-icon-container">${iconHTML}</span>`;
    }
  }

  return CustomAction;
});