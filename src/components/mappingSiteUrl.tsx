import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MappingSiteURLProps } from "@/app/types/types";

const MappingSiteURL = ({ urlDatas }: MappingSiteURLProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Status Code</TableHead>
          <TableHead>Checked at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urlDatas ? urlDatas.map((urlData, i) => {
          const val = urlData.monitors
          return (
            <TableRow key={urlData.id}>
              <TableCell className="font-medium">
                {val?.name}
              </TableCell>
              <TableCell>{val?.url}</TableCell>
              <TableCell>
                <span
                  className={`${urlData.status_code === 200 ? "green-flashing" : "red-flashing"}`}
                ></span>
              </TableCell>
              <TableCell>{urlData.status_code}</TableCell>
              <TableCell>{urlData.checked_at}</TableCell>
            </TableRow>
          );
        }) : "登録データがありません"}
      </TableBody>
    </Table>
  );
};

export default MappingSiteURL;
