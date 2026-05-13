import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/api/query/use-post-query", () => ({
  usePostQuery: jest.fn(),
}));

jest.mock("@/api/query/use-staff-query", () => ({
  useAllStaffQuery: jest.fn(),
}));

jest.mock("@/api/query/use-todo-query", () => ({
  useToDoQuery: jest.fn(),
}));

jest.mock("@/component/staff-component/staff-table/staff-table", () => ({
  __esModule: true,
  default: ({ staff }: any) => (
    <div data-testid="staff-card">{staff.name}</div>
  ),
}));

jest.mock("@/component/staff-component/table-post", () => ({
  __esModule: true,
  default: ({ postData }: any) => (
    <div data-testid="table-post">Posts: {postData.length}</div>
  ),
}));

jest.mock("@/component/staff-component/table-todo", () => ({
  __esModule: true,
  default: ({ todoList }: any) => (
    <div data-testid="table-todo">Todos: {todoList.length}</div>
  ),
}));

jest.mock("@/component/ui/navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar</div>,
}));

jest.mock("@/component/ui/sidebar", () => ({
  __esModule: true,
  default: ({ menu }: any) => (
    <div data-testid="sidebar">Sidebar - {menu}</div>
  ),
}));

jest.mock("@/component/ui/skeleton-load", () => ({
  SkeletonLoad: () => <div data-testid="skeleton">Loading...</div>,
}));

import { useParams } from "next/navigation";
import { usePostQuery } from "@/api/query/use-post-query";
import { useAllStaffQuery } from "@/api/query/use-staff-query";
import { useToDoQuery } from "@/api/query/use-todo-query";
import StaffDetails from "@/app/staff-details/[id]/page";

const mockedUseParams = useParams as jest.Mock;
const mockedUsePostQuery = usePostQuery as jest.Mock;
const mockedUseAllStaffQuery = useAllStaffQuery as jest.Mock;
const mockedUseToDoQuery = useToDoQuery as jest.Mock;

describe("StaffDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseParams.mockReturnValue({
      id: "1",
    });
  });

  it("renders staff detail correctly", () => {
    mockedUseAllStaffQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: "John Doe",
        },
      ],
      isLoading: false,
      error: null,
    });

    mockedUsePostQuery.mockReturnValue({
      data: [
        {
          id: 1,
          userId: 1,
          title: "Post 1",
        },
        {
          id: 2,
          userId: 2,
          title: "Post 2",
        },
      ],
      isLoading: false,
      error: null,
    });

    mockedUseToDoQuery.mockReturnValue({
      data: [
        {
          id: 1,
          userId: 1,
          title: "Todo 1",
        },
        {
          id: 2,
          userId: 2,
          title: "Todo 2",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<StaffDetails />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    expect(screen.getByTestId("staff-card")).toHaveTextContent(
      "John Doe"
    );

    expect(screen.getByTestId("table-post")).toHaveTextContent(
      "Posts: 1"
    );

    expect(screen.getByTestId("table-todo")).toHaveTextContent(
      "Todos: 1"
    );
  });

  it("shows loading skeleton when post data is loading", () => {
    mockedUseAllStaffQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: "John Doe",
        },
      ],
      isLoading: false,
      error: null,
    });

    mockedUsePostQuery.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    mockedUseToDoQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<StaffDetails />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows empty message when no posts exist", () => {
    mockedUseAllStaffQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: "John Doe",
        },
      ],
      isLoading: false,
      error: null,
    });

    mockedUsePostQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    mockedUseToDoQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<StaffDetails />);

    expect(
      screen.getByText("This staff has no post!")
    ).toBeInTheDocument();
  });

  it("shows empty message when no todos exist", () => {
    mockedUseAllStaffQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: "John Doe",
        },
      ],
      isLoading: false,
      error: null,
    });

    mockedUsePostQuery.mockReturnValue({
      data: [
        {
          id: 1,
          userId: 1,
          title: "Post 1",
        },
      ],
      isLoading: false,
      error: null,
    });

    mockedUseToDoQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<StaffDetails />);

    expect(
      screen.getByText("This staff has no task to do!")
    ).toBeInTheDocument();
  });
});