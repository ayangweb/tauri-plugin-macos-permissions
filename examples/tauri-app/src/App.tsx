import { useCreation, useMount, useReactive } from "ahooks";
import { Button, Flex, List, Typography } from "antd";
import {
  checkAccessibilityPermission,
  checkFullDiskAccessPermission,
  requestAccessibilityPermission,
  requestFullDiskAccessPermission,
  checkScreenRecordingPermission,
  requestScreenRecordingPermission,
  checkMicrophonePermission,
  requestMicrophonePermission,
  checkCameraPermission,
  requestCameraPermission,
  checkInputMonitoringPermission,
  requestInputMonitoringPermission,
} from "tauri-plugin-macos-permissions-api";

const App = () => {
  const state = useReactive({
    accessibilityPermission: false,
    fullDiskAccessPermission: false,
    screenRecordingPermission: false,
    microphonePermission: false,
    cameraPermission: false,
    inputMonitoringPermission: false,
  });

  useMount(async () => {
    state.accessibilityPermission = await checkAccessibilityPermission();
    state.fullDiskAccessPermission = await checkFullDiskAccessPermission();
    state.screenRecordingPermission = await checkScreenRecordingPermission();
    state.microphonePermission = await checkMicrophonePermission();
    state.cameraPermission = await checkCameraPermission();
    state.inputMonitoringPermission = await checkInputMonitoringPermission();
  });

  const data = useCreation(() => {
    return [
      {
        label: "Accessibility Permission",
        value: state.accessibilityPermission,
        check: async () => {
          await requestAccessibilityPermission();

          const check = async () => {
            state.accessibilityPermission =
              await checkAccessibilityPermission();

            if (state.accessibilityPermission) return;

            setTimeout(check, 1000);
          };

          check();
        },
      },
      {
        label: "Full Disk Access Permission",
        value: state.fullDiskAccessPermission,
        check: requestFullDiskAccessPermission,
      },
      {
        label: "Screen Recording Permission",
        value: state.screenRecordingPermission,
        check: requestScreenRecordingPermission,
      },
      {
        label: "Microphone Permission",
        value: state.microphonePermission,
        check: async () => {
          await requestMicrophonePermission();

          const check = async () => {
            state.microphonePermission = await checkMicrophonePermission();

            if (state.microphonePermission) return;

            setTimeout(check, 1000);
          };

          check();
        },
      },
      {
        label: "Camera Permission",
        value: state.cameraPermission,
        check: async () => {
          await requestCameraPermission();

          const check = async () => {
            state.cameraPermission = await checkCameraPermission();

            if (state.cameraPermission) return;

            setTimeout(check, 1000);
          };

          check();
        },
      },
      {
        label: "Input Monitoring Permission",
        value: state.inputMonitoringPermission,
        check: requestInputMonitoringPermission,
      },
    ];
  }, [{ ...state }]);

  return (
    <Flex vertical gap="middle">
      <List
        bordered
        dataSource={data}
        renderItem={(item) => {
          const { label, value, check } = item;

          return (
            <List.Item key={label} title={label}>
              <List.Item.Meta title={label} />

              {value ? (
                <Typography.Text type="success">Authorized</Typography.Text>
              ) : (
                <Button onClick={check}>Authorize Now</Button>
              )}
            </List.Item>
          );
        }}
      />
    </Flex>
  );
};

export default App;
