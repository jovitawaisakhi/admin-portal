import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AllStaff from "@/app/staff/page";
import { useAllStaffQuery } from "@/api/query/use-staff-query";

jest.mock("@/api/query/use-staff-query");

jest.mock("@/component/ui/sidebar", () => () => (
    <div>Sidebar</div>
));

jest.mock("@/component/ui/navbar", () => () => (
    <div>Navbar</div>
));

jest.mock("@/component/ui/skeleton-load", () => ({
    SkeletonLoad: () => <div>Loading Skeleton</div>,
}));

jest.mock("@/component/staff-component/table-staff", () => ({
    __esModule: true,
    default: ({ staff }: any) => (
        <div data-testid="table-staff">
            {staff.map((item: any) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    ),
}));

jest.mock("@/component/staff-component/card-staff", () => ({
    __esModule: true,
    CardStaff: ({ staff }: any) => (
        <div data-testid="card-staff">
            {staff.name}
        </div>
    ),
}));

jest.mock("@/component/ui/searchBar", () => ({
    __esModule: true,
    default: ({ searchInput, setSearchInput }: any) => (
        <input
            placeholder="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />
    ),
}));

const mockedUseAllStaffQuery = useAllStaffQuery as jest.Mock;

describe("AllStaff Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows loading state", () => {
        mockedUseAllStaffQuery.mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(<AllStaff />);

        expect(
            screen.getByText(/loading skeleton/i)
        ).toBeInTheDocument();
    });

    it("shows error state", () => {
        mockedUseAllStaffQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: true,
        });

        render(<AllStaff />);

        expect(
            screen.getByText(/failed to load staff/i)
        ).toBeInTheDocument();
    });

    it("renders both table and card staff list", () => {
        mockedUseAllStaffQuery.mockReturnValue({
            data: [
                {
                    id: 1,
                    name: "John",
                    email: "john@gmail.com",
                },
                {
                    id: 2,
                    name: "Sarah",
                    email: "sarah@gmail.com",
                },
            ],
            isLoading: false,
            error: null,
        });

        render(<AllStaff />);

        expect(screen.getAllByText("John").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Sarah").length).toBeGreaterThan(0);

        expect(
            screen.getByTestId("table-staff")
        ).toBeInTheDocument();

        expect(
            screen.getAllByTestId("card-staff").length
        ).toBe(2);
    });

    it("filters by search input", async () => {
        mockedUseAllStaffQuery.mockReturnValue({
            data: [
                {
                    id: 1,
                    name: "John",
                    email: "john@gmail.com",
                },
                {
                    id: 2,
                    name: "Sarah",
                    email: "sarah@gmail.com",
                },
            ],
            isLoading: false,
            error: null,
        });

        render(<AllStaff />);

        const input = screen.getByPlaceholderText(/search/i);

        await userEvent.type(input, "Sarah");

        expect(
            screen.getAllByText("Sarah").length
        ).toBeGreaterThan(0);

        expect(
            screen.queryByText("John")
        ).not.toBeInTheDocument();
    });

    it("shows empty state", () => {
        mockedUseAllStaffQuery.mockReturnValue({
            data: [],
            isLoading: false,
            error: null,
        });

        render(<AllStaff />);

        expect(
            screen.getByText(/no staff found/i)
        ).toBeInTheDocument();
    });
});