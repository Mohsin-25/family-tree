import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export function Form() {
  return (
    <Card className="w-full bg-white p-5 gap-3">
      <p>Add Member</p>

      <hr className="text-gray-300" />
      <div>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Enter"
                required
                className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="grid gap-2 flex-1/3">
                <label htmlFor="email">Gender</label>
                <Select>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Male</SelectItem>
                      <SelectItem value="banana">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 flex-1/3">
                <label htmlFor="email">DOB</label>
                <Input
                  id="dob"
                  type="date"
                  required
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none w-auto"
                />
              </div>
              <div className="grid gap-2 flex-1/3">
                <label htmlFor="email">Marital Status</label>
                <Select>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Single</SelectItem>
                      <SelectItem value="banana">Married</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="name">Profession</label>
              <Input
                id="profession"
                type="text"
                placeholder="Enter"
                required
                className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              />
            </div>
          </div>
        </form>
      </div>
      <hr className="mb-2 mt-4 text-gray-300" />
      <div className="flex-col gap-2">
        <Button variant="outline" className="w-full bg-gray-200" type="submit">
          Submit
        </Button>
      </div>
    </Card>
  );
}
