format shortg;
y=2;
while y > 1 
    c=clock;
    x.clock=c;
    x.year=c(:,1);
    x.month = c(:,2);
    x.date = c(:,3);
    x.hours = c(:,4);
    x.minutes=c(:,5);
    x.seconds = c(:,6);
    savejson('',x,'data/c.json');
end