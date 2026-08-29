import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { useSearchParams } from "react-router"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const [value, setValue] = useState(search)
  const debounced = useDebouncedValue(value, 300)
  useEffect(() => {

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)

        if (debounced) {
          next.set("search", debounced)
        } else {
          next.delete("search")
        }

        return next
      },
    )
  }, [debounced, search, setSearchParams])

  return (
    <InputGroup className="max-w-xs my-2">
      <InputGroupInput
        placeholder="Search tasks..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Clear search"
            onClick={() => setValue("")}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
