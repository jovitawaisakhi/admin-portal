import { StaffResponse } from "@/types/staff";
import {Avatar, Card} from "@heroui/react";
import { Globe, Info } from "lucide-react";
import Link from "next/link";

interface Props{
    staff: StaffResponse
}

export function CardStaff({staff} : Props) {
  return (
    <div className="flex justify-center md:hidden">
      <Card className="w-full sm:w-[300px] gap-2">
        <Card.Header>
            <div className="flex justify-between">
                <Card.Title className="text-xl">{staff.name}</Card.Title>
                <Link href={`/staff-details/${staff.id}`}>
                    <Info/>
                </Link>
            </div>
            <Card.Description>{staff.email}</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
            <Globe size={16}/>
            <span className="text-xs">{staff.website}</span>
        </Card.Footer>
      </Card>
    </div>
  );
}