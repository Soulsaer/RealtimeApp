"user server";

import { nanoid } from 'nanoid';
import liveblocks from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { stringify } from 'querystring';
import { parseStringify } from '../utils';

export const createDocument = async ({userId , email} : CreateDocumentParams) => {
    const roomId = nanoid();
    
    try {
         const metadata = {
            creatorId: userId,
            email: email,
            title: 'Untitled'
         }

         const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
         }

         const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: [],

          });

          revalidatePath('/');
          return parseStringify(room);
    }
    catch (error){
        console.error('Error creating document', error);
        throw new Error('Failed to create document');
    }
}