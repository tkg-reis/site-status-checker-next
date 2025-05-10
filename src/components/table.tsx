import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"  
import { MappingRegisteredURLProps } from '@/app/types/types'

const MappingRegisteredURL = ({urlDatas} :MappingRegisteredURLProps) => {
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="">Company</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status Code</TableHead>
            <TableHead className="">registerd at</TableHead>
            <TableHead className="">Details</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                urlDatas.map((urlData) => {
                    return (
                        <TableRow >
                            <TableCell className="font-medium">{urlData.company_name}</TableCell>
                            <TableCell>{urlData.url}</TableCell>
                            <TableCell>
                                <span
                                className={`${urlData.status_number === 200 ? "green-flashing" : "red-flashing"}`}
                                ></span>
                            </TableCell>
                            <TableCell>{urlData.status_number}</TableCell>
                            <TableCell>{urlData.created_at}</TableCell>
                            <TableCell>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button variant="link">detail</Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-200">
                                        <div className="flex justify-between space-x-4">
                                            example
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
        </Table>
    )
}

export default MappingRegisteredURL