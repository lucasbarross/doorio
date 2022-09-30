export const circleIntersect = (one, two) => {
    let radiusDiff = (one.radius - two.radius) * (one.radius - two.radius);
    let posDiff = (one.x - two.x) * (one.x - two.x) + (one.y - two.y) * (one.y - two.y);
    return radiusDiff <= posDiff && posDiff <= (one.radius + two.radius) * (one.radius + two.radius);
};

export const circleRectIntersect = (circle, rect) => {
    let DeltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    let DeltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
    return (DeltaX * DeltaX + DeltaY * DeltaY) < (circle.radius * circle.radius);
};