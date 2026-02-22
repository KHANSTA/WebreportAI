# Webreport AI Exhaustive Reference Guide

This document is an exhaustive catalog of all tags and sub-tags identified in the [Webreport AI](file:///d:/LLM/Webreports/Webreport AI) documentation. It is categorized by the primary documentation sections: Content Control Tags, Data Tags, and Sub-Tags.

---

## 1. Content Control Tags
These tags control the execution, flow, and output environment of the WebReport.

| Tag Name | Description | Common Usage |
|----------|-------------|--------------|
| `[// ... ]` | Single line comment. | Restricting data sent to browser. |
| `[/* ... */]` | Block comment. | Multi-line documentation within reports. |
| `[LL_WEBREPORT_APPEAR...OFF /]` | Excludes specific Appearance HTML (BOTTOM, LEFT, RIGHT, TOP, TOPHEADER). | Clean UI/Custom layouts. |
| `[LL_WEBREPORT_CALL ... /]` | Calls a server-side OScript function. | Complex server-side logic. |
| `[LL_WEBREPORT_COMPILER ... /]` | Evaluates constants/parameters at runtime. | Dynamic tag evaluation. |
| `[LL_WEBREPORT_COMPRESS /]` | Removes whitespace from output. | Performance optimization. |
| `[LL_WEBREPORT_ENABLEROWFILTERS /]` | Enables support for filtering rows using "fc_filters". | Dynamic client-side filtering. |
| `[LL_WEBREPORT_EXCLUDE... /]` | Excludes standard UI elements (ADDITEM, CHANNEL, FOOTER, HEADER, HTML, LOCATIONDISPLAY, MENU, SEARCH, TITLE). | Embedding reports in other pages. |
| `[LL_WEBREPORT_EXITIF (expr) /]` | Stops row processing when a condition is met. | Early exit from loops. |
| `[LL_WEBREPORT_FOR ... /]` | Loops over collections (Lists, RecArrays, Assocs, etc.). | Iterating through results. |
| `[LL_WEBREPORT_FORCEUTF8 /]` | Adds a UTF8 BOM to the output. | Character encoding fix. |
| `[LL_WEBREPORT_FORMPARSEOFF /] ` | Disables standard WebForms parsing. | WebReports in Power Views. |
| `[LL_WEBREPORT_IF /] [LL_WEBREPORT_ELSEIF /] [LL_WEBREPORT_ELSE /]` | Conditional logic. | Show/hide content based on data. |
| `[LL_WEBREPORT_INCLUDEDISTINCT /]` | Limits rows to unique key values. | Deduplicating results. |
| `[LL_WEBREPORT_INCLUDEIF (expr) /]` | Determines if a whole row is included. | Data-driven filtering. |
| `[LL_WEBREPORT_INCLUDERANGE /]` | Limits rows to a specific range (STARTROW, ENDROW, MAXROWS). | Pagination support. |
| `[LL_WEBREPORT_INSERTJSARRAY /]` | Inserts data as a JavaScript array. | Client-side data manipulation. |
| `[LL_WEBREPORT_INSERTJSON /]` | Inserts data formatted as JSON. | AJAX integrations. |
| `[LL_WEBREPORT_JSLIBS /]` | Inserts standard Content Server JS libraries. | UI enhancements (JQUERY, BROWSE). |
| `[LL_WEBREPORT_RESTCLIENT /]` | Sends requests to external REST APIs. | External system integration. |
| `[LL_WEBREPORT_RUNIF (expr) /]` | Aborts report execution if condition met. | Global access control. |
| `[LL_WEBREPORT_SORT /]` | Sorts the report data set. | Ordering results. |
| `[LL_WEBREPORT_SUBWEBREPORT /]` | Calls another WebReport and inserts results. | Modular report building. |
| `[LL_WEBREPORT_TITLE /]` | Overrides the browser title. | Custom labeling. |

---

## 2. Data Tags (Static & Dynamic)
Tags that retrieve specific data points from the system or context.

| Tag Name | Description | Category |
|----------|-------------|----------|
| `[LL_REPTAG=<col> /]` | Inserts source data from `<columnname>`. | Source Data |
| `[LL_REPTAG_!var /]` | Shortcut to `[LL_REPTAG_%var CURRENTVAL /]`. | Variables |
| `[LL_REPTAG_$const /]` | Accesses defined constants. | Infrastructure |
| `[LL_REPTAG_%var /]` | Returns the final value of a variable. | Variables |
| `[LL_REPTAG_&parm /]` | Accesses URL parameters (querystring). | Request Data |
| `[LL_REPTAG_@FUNC /]` | Data functions (AVERAGE, MIN, MAX, SUM, DATA[r]). | Math/Stats |
| `[LL_REPTAG_ACTUALROWS /]` | Number of rows after `INCLUDEIF`. | Stats |
| `[LL_REPTAG_ACTUALUSERID /]` | ID of the actual user (ignores RunAs). | Identity |
| `[LL_REPTAG_APPSUPPORTDIR /]` | Path to application support dir. | Pathing |
| `[LL_REPTAG_DATE /] [LL_REPTAG_DATETIME /]` | Current execution date/time. | Metadata |
| `[LL_REPTAG_DATASOURCE /]` | Returns full data source as RecArray. | Source Data |
| `[LL_REPTAG_EACID /] [LL_REPTAG_EACPARAMS /]` | Event Action Center data. | Events |
| `[LL_REPTAG_LANGUAGE /]` | Current system language. | Localization |
| `[LL_REPTAG_MYID /] [LL_REPTAG_MYURL /]` | Current WebReport ID and URL. | Context |
| `[LL_REPTAG_OTCSTICKET /]` | Generates REST API auth ticket. | Security |
| `[LL_REPTAG_PARENTID /]` | DataID of the parent object. | Node Data |
| `[LL_REPTAG_ROWNUM /]` | Current row index. | Iteration |
| `[LL_REPTAG_TRIGGER /]` | The event that initiated the report. | Events |
| `[LL_REPTAG_USERID /] [LL_REPTAG_USERNAME /]` | Current user details. | Identity |

---

## 3. Sub-Tag Reference Guide
These sub-tags format or transform the data retrieved by Data Tags.

### Formatting & Types
- `UPPER`, `LOWER`: Case conversion.
- `TODATE`, `DATE`: Date parsing and formatting.
- `TOJSON`, `UNESCAPEJSON`: JSON operations.
- `TRIM`, `SUBSTR`, `SLICE`, `LENGTH`: String manipulation.
- `REPLACE`, `PATCHANGE`: Text substitution.
- `STRIPHTML`: Cleaning HTML tags.

### Logic & Math
- `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`, `MODULUS`: Basic arithmetic.
- `ROUND`: Rounding (CEIL, FLOOR).
- `AVERAGE`, `SUM`, `MAX`, `MIN`: Collection operations.
- `DECODE`: Conditional value mapping (IF-THEN-ELSE).
- `BITCHECK`: Binary bit testing.

### System & Metadata
- `NODEINFO`: Context data (Name, ID, Parent, Path, Subtype, etc.).
- `NODEACTION`: Object operations (CREATE, COPY, MOVE, RENAME, DELETE).
- `PERMINFO`, `PERMACTION`, `PERMCHECK`: Security management.
- `RM_INFO`, `RM_ACTION`: Records Management (Classifications, Holds).
- `WFTASK`, `WFINFO`, `WFACTION`: Workflow integration.
- `USER_INFO`, `USER_ACTION`, `GROUP_MEMBERS`: ID management.
- `CAT`, `CATACTION`: Category and Attribute access.

### Specialized
- `XENGADN`: Automated Document Numbering.
- `XENGCAD`: Engineering/CAD relationships.
- `XENGSFM`: State Flow management.
- `XENGTRANSMITTAL`: Shipping/Transmittal packages.
- `BOINFO`, `BOACTION`: Extended ECM Business Objects.

---
> [!IMPORTANT]
> This guide is dynamically synchronized with the core documentation to ensure the AI utilizes the correct syntax for 400+ tags.
