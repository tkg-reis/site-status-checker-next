import React from 'react'
import { MappingRegisteredURLProps } from '@/app/types/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import UpdateForm from './updateForm';
import DeleteForm from './deleteForm';

const MappingRegisteredUrl = ({ urlDatas } : MappingRegisteredURLProps) => {
  return (
    <>
      {urlDatas.map((urlData) => {
        return (
          <Card className="" key={urlData.id}>
            <CardHeader>
              <CardTitle>{urlData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Input type="hidden" value={urlData.name} />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">{urlData.url}</Label>
                      <Input type="hidden" value={urlData.url} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">
                        ※定期実行作成中
                      </Label>
                      <Input disabled type="hidden" value={urlData.execution_time} />
                    </div>
                  </div>
                </div>
              </form>
              <div className="flex gap-2 mt-2">
                <UpdateForm urlData={urlData}/>
                <DeleteForm urlData={urlData}/>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  )
}

export default MappingRegisteredUrl