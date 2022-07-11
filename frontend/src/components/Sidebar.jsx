import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AppContext } from '../context/appContext'

function Sidebar() {
    const rooms1 = ['first', 'second','third']
    const user = useSelector((state)=>state.user)
    const {socket,setMembers,members,serCurrentRoom,setRooms,privateMemberMsg,rooms,setPrivateMemberMsg,currentRoom} = useContext(AppContext)
    socket.off('new-user').on('new-user',(payload)=>{
      setMembers(payload)
    })
  return (
    <>
    {user && (
      <>
      <h2>Available Rooms</h2>
      <ListGroup>
        {rooms1.map((room, index)=>(
            <ListGroup.Item key = {index}>
                {room}
            </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member)=>(
        <ListGroup.Item key = {member.id} style={{cursor:"pointer"}}> 
          {member.name}
        </ListGroup.Item>
      ))}
      </>
      )}
    </>
  )
}

export default Sidebar
