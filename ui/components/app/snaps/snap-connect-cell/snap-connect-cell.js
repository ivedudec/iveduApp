import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Icon,
  Text,
} from "../../../component-library";
import Tooltip from "../../../ui/tooltip/tooltip";

const SnapConnectCell = ({ origin, snapId }) => {
  const t = useI18nContext();
  const { name: snapName } = useSelector(state => getSnapMetadata(state, snapId));

  return (
    <Box
      display="flex"
      alignItems="center"
      paddingTop={2}
      paddingBottom={2}
    >
      <SnapIcon snapId={snapId} />
      <Box width="full" paddingLeft={4} paddingRight={4}>
        <Text>
          {t("connectSnap", [
            <strong key="1">{snapName}</strong>,
          ])}
        </Text>
      </Box>
      <Tooltip
        html={
          `<div>${t("snapConnectionWarning", [origin, snapName])}</div>`
        }
        position="bottom"
      >
        <Icon color="#95A1AC" name={"Info"} size={"Sm"} />
      </Tooltip>
    </Box>
  );
};

export default SnapConnectCell;
