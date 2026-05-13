import { StaffResponse } from "@/types/staff";
import { Card } from "@heroui/react";
import { AtSign, Building2, CircleUser, DoorClosed, Globe, Mail, MapPin, Phone, Tag, User } from "lucide-react";
import HeaderList from "./header-list";
import ListItem from "./list-item";

interface Props{
    staff: StaffResponse
}

export default function StaffCard({staff} : Props){
    return(
        <div>
            <div className="flex space-x-5 p-4 mb-10 rounded-xl shadow-sm bg-primary">
                <CircleUser size={100} />
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="font-bold text-xl">{staff.name}</p>

                        <div className="flex items-center">
                            <p className="text-sm">{staff.username}</p>
                            <p className="mx-2">•</p>
                            <p className="text-sm">{staff.company.name}</p>
                        </div>
                    </div>

                    <div className="flex space-x-7">
                        <div className="flex items-center space-x-2">
                            <Mail size={16}/>
                            <p className="text-sm">{staff.email}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Phone size={16}/>
                            <p className="text-sm">{staff.phone}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Globe size={16}/>
                            <p className="text-sm">{staff.website}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <MapPin size={16}/>
                            <p className="text-sm">{staff.address.city}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-5 items-stretch">
                <div className="h-full flex flex-col rounded-2xl border border-foreground/10 overflow-hidden bg-primary">
                    <HeaderList icon={User} title="Personal Information"/>

                    <div className="flex-1 flex flex-col">
                        <ListItem icon={User} keys="Name" value={staff.name} last={false}/>
                        <ListItem icon={AtSign} keys="Username" value={staff.username} last={false}/>
                        <ListItem icon={Mail} keys="Email" value={staff.email} last={false}/>
                        <ListItem icon={Phone} keys="Phone" value={staff.phone} last={false}/>
                        <ListItem icon={Globe} keys="Website" value={staff.website} last={true}/>
                    </div>
                </div>

                <div className="flex flex-col gap-5 h-full">
                    <div className="rounded-2xl border border-foreground/10 overflow-hidden bg-primary">
                        <HeaderList icon={Building2} title="Company"/>
                        <ListItem icon={Building2} keys="Company" value={staff.company.name} last={false}/>
                        <ListItem icon={Tag} keys="Catchphrase" value={staff.company.catchPhrase} last={true}/>
                    </div>

                    <div className="rounded-2xl border border-foreground/10 overflow-hidden bg-primary">
                        <HeaderList icon={MapPin} title="Address"/>
                        <ListItem icon={Tag} keys="Street" value={staff.address.street} last={false}/>
                        <ListItem icon={DoorClosed} keys="Suite" value={staff.address.suite} last={false}/>
                        <ListItem icon={Tag} keys="City" value={staff.address.city} last={false}/>
                        <ListItem icon={Tag} keys="Zip Code" value={staff.address.zipcode} last={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}