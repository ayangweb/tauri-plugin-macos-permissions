import { useCreation, useMount, useReactive } from "ahooks";
import { Button, Flex, List, Typography } from "antd";
import {
  checkAccessibilityPermission,
  checkFullDiskAccessPermission,
  requestAccessibilityPermission,
  requestFullDiskAccessPermission,
  checkScreenRecordingPermission,
  requestScreenRecordingPermission,
} from "tauri-plugin-macos-permissions-api";

const App = () => {
  const state = useReactive({
    accessibilityPermission: false,
    fullDiskAccessPermission: false,
    screenRecordingPermission: false,
  });

  useMount(async () => {
    state.accessibilityPermission = await checkAccessibilityPermission();
    state.fullDiskAccessPermission = await checkFullDiskAccessPermission();
    state.screenRecordingPermission = await checkScreenRecordingPermission();
  });

  const data = useCreation(() => {
    return [
      {
        label: "Accessibility Permission",
        value: state.accessibilityPermission,
        check: async () => {
          await requestAccessibilityPermission();

          const check = async () => {
            const opened = await checkAccessibilityPermission();

            state.accessibilityPermission = opened;

            if (opened) return;

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
