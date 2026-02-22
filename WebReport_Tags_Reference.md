# Webreport AI Sub-tag Reference Guide

This guide provides a structured overview of the sub-tags and functionalities available within the Webreport AI system, based on the documentation in [Webreport AI](file:///d:/LLM/Webreports/Webreport AI).

## 1. Node Management & Information
Sub-tags for interacting with Content Server nodes (documents, folders, etc.).

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `NODEINFO` | Retrieves node metadata (Name, ID, Size, Path, etc.). | `[LL_REPTAG_!NodeID NODEINFO:NAME /]` |
| `NODEACTION` | Performs actions like COPY, MOVE, RENAME, DELETE, CREATE. | `[LL_REPTAG_!NodeID NODEACTION:RENAME:"New Name" /]` |
| `RESERVE` | Reserves/Checkouts a node to a specific user. | `[LL_REPTAG_!NodeID RESERVE:1000 /]` |
| `VERSIONCONTROL` | Sets versioning to Standard or Advanced. | `[LL_REPTAG_!NodeID VERSIONCONTROL:ADVANCED /]` |

## 2. Records Management (RM)
Functions for managing record life cycles, classifications, holds, and retrieval.

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `RM_ACTION` | Performs various RM actions like adding classifications or managing holds. | `[LL_REPTAG_!NodeID RM_ACTION:... /]` |
| `RM_CLASSIFICATION` | Retrieves classification information for a node. | `[LL_REPTAG_!NodeID RM_CLASSIFICATION /]` |
| `RM_HOLD` | Manages RM holds on nodes. | `[LL_REPTAG_!NodeID RM_ACTION:ADDHOLD:"Hold Name" /]` |

## 3. Permissions & Security
Sub-tags for managing ACLs, roles, and security clearance.

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `PERMACTION` | Updates ACLs, Owners, or Public access. | `[LL_REPTAG_!NodeID PERMACTION:ACL:1234:UPDATE:SEE /]` |
| `PERMCHECK` | Checks if a user has specific permissions. | `[LL_REPTAG_!NodeID PERMCHECK:DELETE /]` |
| `PERMINFO` | Returns detailed permission Assocs for a node. | `[LL_REPTAG_!NodeID PERMINFO:OWNER /]` |
| `ROLEACTION` | Manages roles and role members in a workspace. | `[LL_REPTAG_!WkspID ROLEACTION:ADD:NAME="Manager" /]` |
| `SECURITY_LEVEL` | Gets or sets the security level for a node or user. | `[LL_REPTAG_!UserID SECURITY_LEVEL /]` |
| `SCACTION` | Manages Security Clearance and Supplemental Markings. | `[LL_REPTAG_!NodeID SCACTION:CURRENTSECURITY:1 /]` |

## 3. Workflow Management
Interactions with workflows, task management, and attribute setting.

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `WFTASK` | Retrieves information or performs actions on a workflow task. | `[LL_REPTAG_!WorkID WFTASK:STATUS /]` |
| `WFATTR` | Gets or sets workflow attributes. | `[LL_REPTAG_!WorkID WFATTR:"AttrName":Value /]` |
| `WFACTION` | Manipulates workflow status (ARCHIVE, DELETE, RESUME, STOP, etc.). | `[LL_REPTAG_!SubWorkID WFACTION:STOP /]` |
| `SETWFATTR` | Sets workflow attributes from within a workflow context. | `[LL_REPTAG_!Val SETWFATTR:"AttrName" /]` |
| `SETWFFORM` | Populates form fields attached to a workflow. | `[LL_REPTAG_!Val SETWFFORM:Form:Attr /]` |
| `WFTASKACTION` | Performs step-level actions like REASSIGN or SENDON. | `[LL_REPTAG_!TaskIDList WFTASKACTION:SENDON /]` |
| `WFINFO` | Retrieves workflow instance metadata (Title, Status, Dates). | `[LL_REPTAG_!SubWorkID WFINFO:TITLE /]` |

## 4. User and Group Administration
Sub-tags for managing identities and their properties.

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `USER_INFO` | Retrieves specific information about a user. | `[LL_REPTAG_!UserID USER_INFO:LOGINNAME /]` |
| `GROUP_MEMBERS` | Lists members of a target group. | `[LL_REPTAG_!GroupID GROUP_MEMBERS /]` |
| `CREATE_USER` | Create a new user account (admin functionality). | `[LL_REPTAG_!AdminID CREATE_USER:... /]` |

## 5. String and Data Manipulation
Utility sub-tags for formatting and transforming data.

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `TOJSON` | Converts a data structure to a JSON string. | `[LL_REPTAG_!Data TOJSON /]` |
| `TOLIST` | Converts a string or structure to a list. | `[LL_REPTAG_!String TOLIST:"," /]` |
| `TODATE` | Converts a string to a date object based on format. | `[LL_REPTAG_!String TODATE:"%Y/%m/%d" /]` |
| `SUBSTR` | Extracts a substring based on start index and width. | `[LL_REPTAG_!String SUBSTR:5:10 /]` |
| `SLICE` | Extracts a slice based on start and end index. | `[LL_REPTAG_!String SLICE:5:15 /]` |
| `STRIPHTML` | Removes all HTML tags from the input. | `[LL_REPTAG_!HtmlStr STRIPHTML /]` |
| `SIZE` | Converts a numeric size to KB, MB, or GB string. | `[LL_REPTAG_"1048576" SIZE /]` |
| `ROUND` | Rounds numeric values (supports CEIL, FLOOR). | `[LL_REPTAG_!Num ROUND:2 /]` |
| `REPLACE` | Global find and replace within a string. | `[LL_REPTAG_!Str REPLACE:"Old":"New" /]` |
| `PATCHANGE` | Regex-like pattern change (find and replace). | `[LL_REPTAG_!Str PATCHANGE:"find":"replace" /]` |

## 7. Database & SQL Execution
| Sub-tag | Description | Example |
|---------|-------------|---------|
| `RUNSQL` | Executes a LiveReport and returns a RecArray. | `[LL_REPTAG_!LiveReportID RUNSQL:"Param1" /]` |
| `WFDBLOOKUP` | Look up data from WebForms database tables. | `[LL_REPTAG_!Key WFDBLOOKUP:Table:Col /]` |
| `PARSECSV` | Parses CSV strings into structured RecArrays. | `[LL_REPTAG_'A,B,C' PARSECSV /]` |

## 8. Sub-WebReports & Templates
| Sub-tag | Description | Example |
|---------|-------------|---------|
| `RUNSWR` | Calls a sub-WebReport with parameters. | `[LL_REPTAG_!WebReportID RUNSWR:P1:V1 /]` |
| `RUNTEMPLATE` | Runs a template sharing the current context. | `[LL_REPTAG_!TemplateID RUNTEMPLATE /]` |

## 9. Business Workspace Management
Integration with Business Workspaces and Objects.

| Sub-tag | Description | Example |
|---------|-------------|---------|
| `BWS_ACTION` | Performs actions related to Business Workspaces. | `[LL_REPTAG_!BWSID BWS_ACTION:SYNC /]` |
| `BO_INFO` | Retrieves information about a Business Object. | `[LL_REPTAG_!BOID BO_INFO /]` |

## 7. Specialized Modules

### ADN (Automated Document Numbering)
| Sub-tag | Description | Example |
|---------|-------------|---------|
| `XENGADN` | Retrieves ADN numbers and references. | `[LL_REPTAG_!ADNID XENGADN:GETREFERENCES /]` |
| `XENGADNACTION` | Bulk generation, locking/unlocking, and referencing of ADN IDs. | `[LL_REPTAG_!NodeID XENGADNACTION:REFER:... /]` |

### CAD & Engineering
| Sub-tag | Description | Example |
|---------|-------------|---------|
| `XENGCAD` | Retrieves CAD document relationships. | `[LL_REPTAG_!NodeID XENGCAD:GETRELATIONSHIPS /]` |
| `XENGCADACTION` | Connects or disconnects XRef relationships for CAD docs. | `[LL_REPTAG_!NodeID XENGCADACTION:XREFCONNECT /]` |

### State Flows & Transitions
| Sub-tag | Description | Example |
|---------|-------------|---------|
| `XENGSFM` | Gets state flow info and applicable transitions. | `[LL_REPTAG_!NodeID XENGSFM:STATEFLOWINFO /]` |
| `XENGSFMACTION` | Transitions documents, adds/removes assignees, or delegates. | `[LL_REPTAG_!NodeID XENGSFMACTION:TRANSITION /]` |

### Transmittals & Shipping
| Sub-tag | Description | Example |
|---------|-------------|---------|
| `XENGTRANSMITTAL` | Gets details or reports on transmittal workspaces. | `[LL_REPTAG_!TID XENGTRANSMITTAL:TRANSMITTALINFO /]` |
| `XENGTRANSMITTALACTION` | Adds recipients, packages, or sends transmittals. | `[LL_REPTAG_!TID XENGTRANSMITTALACTION:SEND /]` |

### Revision Control (XENGCRT)
- `XENGCRTACTION`: Controls documents, signs in/out, changes status, and manages obsolescence.
- `XENGCRTControlDocumentCount`: Reports on controlled documents based on status/indicators.

---
> [!NOTE]
> This guide is a synthesis of the extensive documentation provided. For specific syntax details and edge cases, refer to the original file.
