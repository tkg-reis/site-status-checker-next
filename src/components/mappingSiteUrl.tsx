import React from "react";
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
          <TableHead className="">Company</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Status Code</TableHead>
          <TableHead className="">registerd at</TableHead>
          <TableHead className="">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urlDatas ? urlDatas.map((urlData, i) => {
          const val = urlData.monitor_checks?.[i]
          return (
            <TableRow key={urlData.id}>
              <TableCell className="font-medium">
                {urlData.name}
              </TableCell>
              <TableCell>{urlData.url}</TableCell>
              <TableCell>
                <span
                  className={`${val?.status_code === 200 ? "green-flashing" : "red-flashing"}`}
                ></span>
              </TableCell>
              <TableCell>{val?.status_code}</TableCell>
              <TableCell>{val?.checked_at}</TableCell>
              <TableCell>
                <div className="flex justify-between space-x-4">
                  delete※実装中
                </div>
              </TableCell>
            </TableRow>
          );
        }) : "登録データがありません"}
      </TableBody>
    </Table>
  );
};

export default MappingSiteURL;
