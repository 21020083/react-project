import {
    forwardRef,
    HTMLAttributes,
    TdHTMLAttributes,
    ThHTMLAttributes,
  } from 'react'
  
  import { cn } from '../../lib/utils/shacn'
  
  const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
    ({ className, onScroll, ...props }, ref) => (
      <div
        className="relative max-h-[500px] w-full overflow-auto rounded-sm"
        onScroll={onScroll}
      >
        <table
          ref={ref}
          aria-label="table"
          className={cn('w-full caption-bottom text-sm', className)}
          {...props}
        />
      </div>
    ),
  )
  Table.displayName = 'Table'
  
  const TableHeader = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
  >(({ className, ...props }, ref) => (
    <thead
      aria-label="table-header"
      ref={ref}
      className={cn('bg-muted', className)}
      {...props}
    />
  ))
  TableHeader.displayName = 'TableHeader'
  
  const TableBody = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
  >(({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('', className)}
      aria-label="table-body"
      {...props}
    />
  ))
  TableBody.displayName = 'TableBody'
  
  const TableFooter = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
  >(({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-muted/50 font-medium', className)}
      aria-label="table-footer"
      {...props}
    />
  ))
  TableFooter.displayName = 'TableFooter'
  
  const TableRow = forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement>
  >(({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      aria-label="table-row"
      {...props}
    />
  ))
  TableRow.displayName = 'TableRow'
  
  const TableHead = forwardRef<
    HTMLTableCellElement,
    ThHTMLAttributes<HTMLTableCellElement>
  >(({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      aria-label="table-header-cell"
      {...props}
    />
  ))
  TableHead.displayName = 'TableHead'
  
  const TableCell = forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement>
  >(({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      aria-label="table-body-cell"
      {...props}
    />
  ))
  TableCell.displayName = 'TableCell'
  
  const TableCaption = forwardRef<
    HTMLTableCaptionElement,
    HTMLAttributes<HTMLTableCaptionElement>
  >(({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  ))
  TableCaption.displayName = 'TableCaption'
  
  export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  }
  