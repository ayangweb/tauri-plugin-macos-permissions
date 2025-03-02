import { invoke } from "@tauri-apps/api/core";

export const COMMAND = {
  CHECK_ACCESSIBILITY_PERMISSION:
    "plugin:macos-permissions|check_accessibility_permission",
  REQUEST_ACCESSIBILITY_PERMISSION:
    "plugin:macos-permissions|request_accessibility_permission",
  CHECK_FULL_DISK_ACCESS_PERMISSION:
    "plugin:macos-permissions|check_full_disk_access_permission",
  REQUEST_FULL_DISK_ACCESS_PERMISSION:
    "plugin:macos-permissions|request_full_disk_access_permission",
  CHECK_SCREEN_RECORDING_PERMISSION:
    "plugin:macos-permissions|check_screen_recording_permission",
  REQUEST_SCREEN_RECORDING_PERMISSION:
    "plugin:macos-permissions|request_screen_recording_permission",
  CHECK_MICROPHONE_PERMISSION: 
    "plugin:macos-permissions|check_microphone_permission",
  REQUEST_MICROPHONE_PERMISSION:
    "plugin:macos-permissions|request_microphone_permission",
  CHECK_AUDIO_PERMISSION:
    "plugin:macos-permissions|check_audio_permission",
  REQUEST_AUDIO_PERMISSION:
    "plugin:macos-permissions|request_audio_permission",
};

/**
 * Check accessibility permission.
 *
 * @returns `true` if accessibility permission are granted, `false` otherwise.
 *
 * @example
 * import { checkAccessibilityPermission } from "tauri-plugin-macos-permissions-api";
 *
 * const authorized = await checkAccessibilityPermission();
 * console.log(authorized); // false
 */
export const checkAccessibilityPermission = () => {
  return invoke<boolean>(COMMAND.CHECK_ACCESSIBILITY_PERMISSION);
};

/**
 * Request accessibility permission.
 *
 * @example
 * import { requestAccessibilityPermission } from "tauri-plugin-macos-permissions-api";
 *
 * await requestAccessibilityPermission();
 */
export const requestAccessibilityPermission = () => {
  return invoke(COMMAND.REQUEST_ACCESSIBILITY_PERMISSION);
};

/**
 * Check full disk access permission.
 *
 * @returns `true` if full disk access permission are granted, `false` otherwise.
 *
 * @example
 * import { checkFullDiskAccessPermission } from "tauri-plugin-macos-permissions-api";
 *
 * const authorized = await checkFullDiskAccessPermission();
 * console.log(authorized); // false
 */
export const checkFullDiskAccessPermission = () => {
  return invoke<boolean>(COMMAND.CHECK_FULL_DISK_ACCESS_PERMISSION);
};

/**
 * Request full disk access permission.
 *
 * @example
 * import { requestFullDiskAccessPermission } from "tauri-plugin-macos-permission-api";
 *
 * await requestFullDiskAccessPermission();
 */
export const requestFullDiskAccessPermission = () => {
  return invoke(COMMAND.REQUEST_FULL_DISK_ACCESS_PERMISSION);
};

/**
 * Check screen recording permission.
 *
 * @returns `true` if screen recording permission are granted, `false` otherwise.
 *
 * @example
 * import { checkScreenRecordingPermission } from "tauri-plugin-macos-permissions-api";
 *
 * const authorized = await checkScreenRecordingPermission();
 * console.log(authorized); // false
 */
export const checkScreenRecordingPermission = () => {
  return invoke<boolean>(COMMAND.CHECK_SCREEN_RECORDING_PERMISSION);
};

/**
 * Request screen recording permission.
 *
 * @example
 * import { requestScreenRecordingPermission } from "tauri-plugin-macos-permissions-api";
 *
 * await requestScreenRecordingPermission();
 */
export const requestScreenRecordingPermission = () => {
  return invoke(COMMAND.REQUEST_SCREEN_RECORDING_PERMISSION);
};

/**
 * Check microphone permission.
 *
 * @returns `true` if microphone permission are granted, `false` otherwise.
 *
 * @example
 * import { checkMicrophonePermission } from "tauri-plugin-macos-permissions-api";
 *
 * const authorized = await checkMicrophonePermission();
 * console.log(authorized); // false
 */
export const checkMicrophonePermission = () => {
  return invoke<boolean>(COMMAND.CHECK_MICROPHONE_PERMISSION);
};

/**
 * Request microphone permission.
 *
 * @example
 * import { requestMicrophonePermission } from "tauri-plugin-macos-permissions-api";
 *
 * await requestMicrophonePermission();
 */
export const requestMicrophonePermission = () => {
  return invoke(COMMAND.REQUEST_MICROPHONE_PERMISSION);
};

/**
 * Check audio permission.
 *
 * @returns `true` if audio permission are granted, `false` otherwise.
 *
 * @example
 * import { checkAudioPermission } from "tauri-plugin-macos-permissions-api";
 *
 * const authorized = await checkAudioPermission();
 * console.log(authorized); // false
 */
export const checkAudioPermission = () => {
  return invoke<boolean>(COMMAND.CHECK_AUDIO_PERMISSION);
};

/**
 * Request audio permission.
 *
 * @example
 * import { requestAudioPermission } from "tauri-plugin-macos-permissions-api";
 *
 * await requestAudioPermission();
 */
export const requestAudioPermission = () => {
  return invoke(COMMAND.REQUEST_AUDIO_PERMISSION);
};
