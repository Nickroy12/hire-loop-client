
import { getCompanyJob } from "@/lib/api/job";
import { Button, Table } from "@heroui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const JobTable = async ({ companyId = "company_9f3k2a1x" }) => {
  const jobs = await getCompanyJob(companyId);

  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-xl font-semibold mb-4">Manage Jobs</h1>

      <Table aria-label="Job Table">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[600px]">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs?.length ? (
                jobs.map((job) => (
                  <Table.Row key={job._id}>
                    <Table.Cell>{job.title}</Table.Cell>
                    <Table.Cell>{job.category}</Table.Cell>
                    <Table.Cell>                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status?.toLowerCase() === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span></Table.Cell>
                    <Table.Cell>
                                      <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    color="primary"
                    variant="flat"
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    size="sm"
                    color="warning"
                    variant="flat"
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    variant="flat"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>No Jobs Found</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default JobTable;