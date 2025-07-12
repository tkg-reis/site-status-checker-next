import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User, UserMetadata } from '@supabase/supabase-js';

const MappingUserData = ( { user } : {  user : User }) => {

    const userMetaData: UserMetadata = user.user_metadata;
  return (
    <>
        <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">user</TableHead>
                  <TableHead>email</TableHead>
                  <TableHead className="">last sign in</TableHead>
                  <TableHead className="">edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow >
                    <TableCell>{userMetaData.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.last_sign_in_at}</TableCell>
                    <TableCell>edit</TableCell>
                </TableRow>
              </TableBody>
            </Table>
    </>
  )
}

export default MappingUserData