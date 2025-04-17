"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState, // Keep sorting
  getSortedRowModel, // Keep sorting
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

interface UsageTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex?: number;
  pageSize?: number;
  rowCount?: number;
  sorting?: { id: string; desc: boolean }[];
  onSortingChange?: (sorting: { id: string; desc: boolean }[]) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLayoutColumns, IconChevronDown } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";

export function UsageTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  rowCount,
  sorting,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
}: UsageTableProps<TData, TValue>) {
  const isControlledSorting = typeof sorting !== 'undefined' && typeof onSortingChange === 'function';
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: isControlledSorting ? sorting : internalSorting,
      columnVisibility,
      pagination: pageIndex !== undefined && pageSize !== undefined ? {
        pageIndex,
        pageSize,
      } : undefined,
    },
    onSortingChange: isControlledSorting ? onSortingChange! : setInternalSorting as any,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: !!onPageChange,
    pageCount: rowCount && pageSize ? Math.ceil(rowCount / pageSize) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // Keep sorting
    initialState: {
      pagination: {
        pageSize: pageSize ?? 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* Customize Columns Dropdown */}
      <div className="flex items-center justify-end px-2 -mt-18 pt-3 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <IconLayoutColumns className="size-4" />
              <span className="hidden md:inline">Customize Columns</span>
              <span className="md:hidden">Columns</span>
              <IconChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table.getAllColumns()
              .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* Optional: Add selected row count if needed later */}
          {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                if (onPageSizeChange) {
                  onPageSizeChange(Number(value));
                } else {
                  table.setPageSize(Number(value));
                }
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => {
                if (onPageChange) onPageChange(0);
                else table.setPageIndex(0);
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => {
                if (onPageChange) onPageChange(table.getState().pagination.pageIndex - 1);
                else table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => {
                if (onPageChange) onPageChange(table.getState().pagination.pageIndex + 1);
                else table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => {
                if (onPageChange) onPageChange(table.getPageCount() - 1);
                else table.setPageIndex(table.getPageCount() - 1);
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
