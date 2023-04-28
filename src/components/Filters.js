import { Group, Select } from "@mantine/core";
import React, { useEffect } from "react";
import { DatePickerInput } from '@mantine/dates';


function Filters({ setFilters, filters }) {

  return (
    <Group>
      <Select
        label="Select Frequency"
        placeholder="Select Frequency"
        data={[
          { label: "Last Week", value: "7" },
          { label: "Last Month", value: "30" },
          { label: "Last Year", value: "365" },
          { label: "Custom Range", value: "custom-range" },
        ]}
        value={filters.frequency}
        onChange={(value) => setFilters({ ...filters, frequency: value })}
        name="frequency"
      />
      {filters.frequency === "custom-range" && <DatePickerInput
        size="sm"
        type="range"
        label="Pick dates range"
        placeholder="Pick dates range"
        onChange={(value) => setFilters({ ...filters, dateRange: value })}
        mx="auto"
        maw={400}
      />}

      <Select
        label="Select Type"
        placeholder="Select Type"
        data={[
          { label: "All", value: "" },
          { label: "Income", value: "income" },
          { label: "Expenses", value: "expenses" },
        ]}
        value={filters.type}
        onChange={(value) => setFilters({ ...filters, type: value })}
        name="type"
      />
    </Group>
  );
}

export default Filters;